#!/usr/bin/env node
/**
 * JSON Insight - Folder Ingestion Tester (CommonJS)
 * Node 16+ ok (usa fetch in Node 18+ oppure installa node-fetch).
 */
const { readdir, readFile, stat } = require("fs/promises");
const path = require("path");

// In Node <18 serve: const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const k = a.slice(2);
    const n = argv[i + 1];
    if (n == null || n.startsWith("--")) {
      out[k] = true;
    } else {
      out[k] = n;
      i++;
    }
  }
  return out;
}

async function walk(dir, recursive) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (recursive) files.push(...await walk(p, recursive));
    } else {
      files.push(p);
    }
  }
  return files;
}

async function findJsonFiles(rootDir, pattern, recursive) {
  const all = await walk(rootDir, recursive);
  return all.filter(f => f.toLowerCase().includes(pattern.toLowerCase()));
}

async function readJson(file) {
  const raw = await readFile(file, "utf-8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${file}: ${(e && e.message) || e}`);
  }
}

async function postJson(baseUrl, body, apiKey, timeoutMs) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/json/ingest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "x-api-key": apiKey } : {}),
      },
      body: JSON.stringify(body),
      signal: ctrl.signal
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${text}`);
    }
    return res.json();
  } finally {
    clearTimeout(t);
  }
}

(async function main() {
  const args = parseArgs(process.argv);
  const dir = args.dir;
  if (!dir) {
    console.error("Missing --dir <folder>");
    process.exit(1);
  }
  const baseUrl = args["base-url"] || "http://localhost:3001";
  const pattern = args.pattern || ".json";
  const recursive = !!args.recursive;
  const merge = !!args.merge;
  const concurrency = Math.max(1, Number(args.concurrency || 2));
  const dryRun = !!args["dry-run"];
  const timeoutMs = Number(args.timeout || 45000);
  const apiKey = process.env.API_KEY || "";

  const absDir = path.resolve(process.cwd(), dir);
  const st = await stat(absDir).catch(() => null);
  if (!st || !st.isDirectory()) {
    console.error(`Not a directory: ${absDir}`);
    process.exit(1);
  }

  const files = await findJsonFiles(absDir, pattern, recursive);
  if (files.length === 0) {
    console.error(`No files matching pattern "${pattern}" under ${absDir}`);
    process.exit(1);
  }

  console.log(`Found ${files.length} file(s). ${merge ? "MERGE mode" : "One dataset per file"}.`);

  const tasks = [];
  if (merge) {
    const merged = [];
    for (const f of files) {
      const j = await readJson(f);
      if (Array.isArray(j)) merged.push(...j);
      else merged.push(j);
    }
    console.log(`Merged ${files.length} files -> ${merged.length} item(s).`);
    if (dryRun) {
      console.log(`[DRY-RUN] Would POST ${merged.length} items to ${baseUrl}/api/json/ingest`);
      return;
    }
    const out = await postJson(baseUrl, merged, apiKey, timeoutMs);
    console.log(`✓ Created dataset:`, out);
  } else {
    for (const file of files) {
      tasks.push(async () => {
        const data = await readJson(file);
        const count = Array.isArray(data) ? data.length : 1;
        if (dryRun) {
          console.log(`[DRY-RUN] Would POST ${count} item(s) from ${path.basename(file)} to ${baseUrl}/api/json/ingest`);
          return { file, out: { datasetId: "<dry-run>" } };
        }
        const out = await postJson(baseUrl, data, apiKey, timeoutMs);
        console.log(`✓ ${path.basename(file)} → datasetId=${out.datasetId}`);
        return { file, out };
      });
    }

    let i = 0;
    const results = [];
    async function worker(id) {
      while (i < tasks.length) {
        const idx = i++;
        try {
          const r = await tasks[idx]();
          results.push(r);
        } catch (e) {
          console.error(`✗ Task ${idx} error:`, e instanceof Error ? e.message : String(e));
        }
      }
    }
    const workers = Array.from({ length: concurrency }, (_, k) => worker(k));
    await Promise.all(workers);
    console.log(`Done. ${results.length}/${files.length} ingested.`);
  }
})().catch(e => {
  console.error("Fatal:", e);
  process.exit(1);
});
