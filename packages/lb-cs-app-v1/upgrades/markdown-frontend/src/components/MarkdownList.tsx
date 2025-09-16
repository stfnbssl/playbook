import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export interface LatestItem {
  nome: string;
  ultimaVersione: number;
  dataUltimaVersione: string; // ISO
}

export default function MarkdownList({
  items,
  onSelect,
}: {
  items: LatestItem[];
  onSelect: (nome: string) => void;
}) {
  return (
    <TableContainer component={Paper} aria-label="Elenco documenti markdown">
      <Table size="small" role="table">
        <TableHead>
          <TableRow role="row">
            <TableCell role="columnheader">Nome</TableCell>
            <TableCell role="columnheader" align="right">Ultima versione</TableCell>
            <TableCell role="columnheader" align="right">Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.nome}
              role="row"
              hover
              onClick={() => onSelect(row.nome)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell role="cell">{row.nome}</TableCell>
              <TableCell role="cell" align="right">{row.ultimaVersione}</TableCell>
              <TableCell role="cell" align="right">{new Date(row.dataUltimaVersione).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
