import { useMemo, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Box, Typography } from "@mui/material";
import type { LatestRow } from "@/api/markdowns";

export interface MarkdownListProps {
  rows: LatestRow[];
  onOpen: (name: string) => void;
}
export default function MarkdownList({ rows, onOpen }: MarkdownListProps) {
  const [q, setQ] = useState<string>("");
  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows.filter(r => r.nome.toLowerCase().includes(qq));
  }, [rows, q]);

  return (
    <Box>
      <TextField
        label="Cerca"
        size="small"
        fullWidth
        margin="normal"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        inputProps={{ "aria-label": "search-name" }}
      />
      <Table aria-label="markdown-list" role="table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Ultima versione</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((r) => (
            <TableRow
              key={r.nome}
              hover
              role="row"
              tabIndex={0}
              onClick={() => onOpen(r.nome)}
              onKeyDown={(e) => { if (e.key === "Enter") onOpen(r.nome); }}
              aria-label={`open-${r.nome}`}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{r.nome}</TableCell>
              <TableCell>{r.ultimaVersione}</TableCell>
              <TableCell>{new Date(r.dataUltimaVersione).toLocaleString()}</TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography>Nessun risultato</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
