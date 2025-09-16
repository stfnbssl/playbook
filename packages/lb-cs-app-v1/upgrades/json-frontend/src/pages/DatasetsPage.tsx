import { useNavigate } from "react-router-dom";
import { useDatasets } from "@/api/datasets";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Skeleton, Alert } from "@mui/material";

export default function DatasetsPage() {
  const nav = useNavigate();
  const { data, isLoading, isError } = useDatasets({ limit: 50, skip: 0 });

  if (isLoading) return <Skeleton variant="rectangular" height={200} />;
  if (isError) return <Alert severity="error">Errore nel caricamento datasets</Alert>;

  const items = data?.items ?? [];

  return (
    <TableContainer component={Paper} aria-label="Elenco datasets">
      <Table size="small" role="table">
        <TableHead>
          <TableRow role="row">
            <TableCell role="columnheader">Title/ID</TableCell>
            <TableCell role="columnheader" align="right">Created</TableCell>
            <TableCell role="columnheader" align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((d) => (
            <TableRow key={d._id} role="row" hover sx={{ cursor: "pointer" }} onClick={() => nav(`/json/${d._id}`)}>
              <TableCell role="cell">
                <Typography variant="body2"><strong>{d.title || d._id}</strong></Typography>
              </TableCell>
              <TableCell role="cell" align="right">{new Date(d.createdAt).toLocaleString()}</TableCell>
              <TableCell role="cell" align="right">{d.stats?.count ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
