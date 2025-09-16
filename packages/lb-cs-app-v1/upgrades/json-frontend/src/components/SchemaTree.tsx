import { useState } from "react";
import { Box, Collapse, Typography, Stack } from "@mui/material";

type Node = { key: string; children?: Node[]; types?: string[] };

function buildTree(paths: Array<{ path: string; types: string[] }>): Node {
  const root: Node = { key: "$", children: [] };
  for (const p of paths) {
    const parts = p.path.split(".");
    let cur = root;
    for (const part of parts) {
      const key = part || "$";
      let child = cur.children?.find((c) => c.key === key);
      if (!child) {
        child = { key, children: [] };
        cur.children!.push(child);
      }
      cur = child;
    }
    cur.types = p.types;
  }
  return root;
}

function TreeNode({ node, depth = 0 }: { node: Node; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = !!node.children && node.children.length > 0;
  return (
    <Box sx={{ pl: depth * 1.5 }}>
      <Typography
        role="button"
        aria-expanded={open}
        onClick={() => hasChildren && setOpen(!open)}
        sx={{ cursor: hasChildren ? "pointer" : "default", userSelect: "none" }}
      >
        {hasChildren ? (open ? "▾ " : "▸ ") : "• "}
        <strong>{node.key}</strong>{node.types ? ` : ${node.types.join("|")}` : ""}
      </Typography>
      {hasChildren && (
        <Collapse in={open}>
          <Stack spacing={0.5} sx={{ mt: 0.5 }}>
            {node.children!.map((c) => (
              <TreeNode key={c.key + depth} node={c} depth={depth + 1} />
            ))}
          </Stack>
        </Collapse>
      )}
    </Box>
  );
}

export default function SchemaTree({ paths }: { paths: Array<{ path: string; types: string[] }> }) {
  const root = buildTree(paths);
  return (
    <Box role="tree" aria-label="Schema">
      {root.children?.map((c, idx) => <TreeNode key={idx} node={c} depth={0} />)}
    </Box>
  );
}
