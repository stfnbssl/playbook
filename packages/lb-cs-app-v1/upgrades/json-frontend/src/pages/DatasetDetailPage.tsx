import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link as RouterLink } from "react-router-dom";
import { useDatasetMeta, useDatasetPrompt, useDatasetSlice } from "@/api/datasets";
import { Alert, Box, Breadcrumbs, Button, Divider, Link as MUILink, Skeleton, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import SchemaTree from "@/components/SchemaTree";
import VirtualTable from "@/components/VirtualTable";
import CopyButton from "@/components/CopyButton";

type Row = { [k: string]: unknown };

function toRows(chunks: Array<{ data: unknown[] }>): unknown[] {
  const out: unknown[] = [];
  for (const c of chunks) out.push(...(c.data || []));
  return out;
}

function projectPath(obj: unknown, path: string): unknown {
  if (!path) return obj;
  const parts = path.split(".").filter(Boolean);
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return null;
    cur = cur[p];
  }
  return cur;
}

function csvEscape(v: unknown): string {
  const s = v == null ? "" : typeof v === "string" ? v : JSON.stringify(v);
  if (/[",\n]/.test(s)) return \"" + s.replace(/"/g, '""') + "\"";
  return s;
}

export default function DatasetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = useSearchParams();
  const chunk = Math.max(0, Number(search.get("chunk") || 0));
  const limit = Math.min(50, Math.max(1, Number(search.get("limit") || 1)));
  const initialPath = search.get("path") || "";

  const { data: meta, isLoading: metaLoading, isError: metaError } = useDatasetMeta(id || null);
  const { data: slice, isLoading: sliceLoading, isError: sliceError } = useDatasetSlice(id || null, chunk, limit);
  const { data: prompt, isLoading: promptLoading, isError: promptError } = useDatasetPrompt(id || null);

  const [path, setPath] = useState<string>(initialPath);
  const [query, setQuery] = useState<string>("");
  const [mode, setMode] = useState<"sample" | "page">((search.get("mode") as any) || "page");
  const [sampleN, setSampleN] = useState<number>(50);

  useEffect(() => { setSearch({ path, chunk: String(chunk), limit: String(limit), mode }); }, [path, chunk, limit, mode, setSearch]);

  const rawRows = useMemo(() => toRows(slice?.items || []), [slice]);
  const projected = useMemo(() => {
    if (!path) return rawRows;
    return rawRows.map((r) => projectPath(r, path)).filter((x) => x != null) as unknown[];
  }, [rawRows, path]);

  const rows: Row[] = useMemo(() => {
    const src = projected;
    if (src.length === 0) return [];
    if (Array.isArray(src)) {
      if (typeof src[0] === "object" && !Array.isArray(src[0])) return src as Row[];
      return (src as unknown[]).map((v) => ({ value: v }));
    }
    return [{ value: src } as Row];
  }, [projected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => JSON.stringify(r).toLowerCase().includes(q));
  }, [rows, query]);

  const columns = useMemo(() => {
    const freq = new Map<string, number>();
    for (const r of rows) for (const k of Object.keys(r)) freq.set(k, (freq.get(k) || 0) + 1);
    return Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).map(([k]) => k).slice(0, 12);
  }, [rows]);

  const displayRows = mode === "sample" ? filtered.slice(0, sampleN) : filtered;

  const downloadCSV = () => {
    const lines = [columns.join(",")];
    for (const r of displayRows) {
      const row = columns.map((c) => csvEscape((r as any)[c]));
      lines.push(row.join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dataset-${id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <MUILink component={RouterLink} to="/json">Datasets</MUILink>
        <Typography color="text.primary">{meta?.title || id}</Typography>
      </Breadcrumbs>

      <Box>
        <Typography variant="h6" gutterBottom>Meta</Typography>
        {metaLoading ? <Skeleton variant="rectangular" height={120} /> : metaError ? <Alert severity="error">Errore meta</Alert> : (
          <Stack direction="row" spacing={4} alignItems="flex-start" sx={{ width: "100%" }}>
            <Box sx={{ minWidth: 280 }}>
              <Typography variant="body2">ID: <code>{meta?._id}</code></Typography>
              <Typography variant="body2">Created: {meta ? new Date(meta.createdAt).toLocaleString() : "-"}</Typography>
              <Typography variant="body2">Count: {meta?.stats?.count}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom>Schema (inferred)</Typography>
              <SchemaTree paths={meta?.stats?.paths || []} />
            </Box>
          </Stack>
        )}
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>Data Explorer</Typography>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ mb: 1 }}>
          <TextField label="JSON path (dot notation)" size="small" value={path} onChange={(e) => setPath(e.target.value)} placeholder="es. items, users[0].posts" />
          <TextField label="Ricerca testuale" size="small" value={query} onChange={(e) => setQuery(e.target.value)} />
          <ToggleButtonGroup exclusive size="small" value={mode} onChange={(_, v) => v && setMode(v)}>
            <ToggleButton value="page">Full page</ToggleButton>
            <ToggleButton value="sample">Sample</ToggleButton>
          </ToggleButtonGroup>
          {mode === "sample" && (
            <TextField label="N" size="small" type="number" value={sampleN} onChange={(e) => setSampleN(Math.max(1, Number(e.target.value)))} sx={{ width: 100 }} />
          )}
          <Button variant="outlined" onClick={downloadCSV}>Download CSV</Button>
        </Stack>

        {sliceLoading ? <Skeleton variant="rectangular" height={240} /> : sliceError ? <Alert severity="error">Errore dati</Alert> : (
          <VirtualTable rows={displayRows as any} columns={columns} height={420} />
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button variant="text" onClick={() => { const next = Math.max(0, chunk - 1); setSearch({ path, chunk: String(next), limit: String(limit), mode }); }}>← Prev chunk</Button>
          <Button variant="text" onClick={() => { const next = chunk + 1; setSearch({ path, chunk: String(next), limit: String(limit), mode }); }}>Next chunk →</Button>
          <TextField size="small" label="Chunk" type="number" value={chunk} onChange={(e) => setSearch({ path, chunk: e.target.value, limit: String(limit), mode })} sx={{ width: 120 }} />
          <TextField size="small" label="Limit" type="number" value={limit} onChange={(e) => setSearch({ path, chunk: String(chunk), limit: e.target.value, mode })} sx={{ width: 120 }} />
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>Prompt Generator</Typography>
        {promptLoading ? <Skeleton variant="rectangular" height={120} /> : promptError ? <Alert severity="error">Errore prompt</Alert> : (
          <Stack spacing={1}>
            <Box component="pre" sx={{ p: 2, bgcolor: "#fafafa", border: "1px solid #eee", borderRadius: 1, whiteSpace: "pre-wrap", maxHeight: 340, overflow: "auto" }} aria-label="Prompt">
              {prompt}
            </Box>
            <CopyButton text={prompt || ""} />
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
