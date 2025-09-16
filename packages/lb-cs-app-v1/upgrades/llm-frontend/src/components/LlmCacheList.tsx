import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import type { LlmCacheItem } from "@/api/llm";

export default function LlmCacheList({
  items,
  onSelect
}: {
  items: LlmCacheItem[];
  onSelect: (id: string) => void;
}) {
  return (
    <TableContainer component={Paper} aria-label="Elenco cache LLM">
      <Table size="small" role="table">
        <TableHead>
          <TableRow role="row">
            <TableCell role="columnheader">ID</TableCell>
            <TableCell role="columnheader">Provider</TableCell>
            <TableCell role="columnheader">Model</TableCell>
            <TableCell role="columnheader" align="right">Created</TableCell>
            <TableCell role="columnheader" align="right">Hits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row._id}
              role="row"
              hover
              onClick={() => onSelect(row._id)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell role="cell">
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>{row._id.slice(0, 12)}…</Typography>
              </TableCell>
              <TableCell role="cell">{row.provider}</TableCell>
              <TableCell role="cell">{row.model}</TableCell>
              <TableCell role="cell" align="right">
                {row.stats?.createdAt ? new Date(row.stats.createdAt).toLocaleString() : "-"}
              </TableCell>
              <TableCell role="cell" align="right">{row.stats?.hits ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
