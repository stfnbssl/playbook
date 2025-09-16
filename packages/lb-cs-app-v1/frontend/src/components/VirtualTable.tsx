import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { Paper, Box, Typography } from "@mui/material";

export interface Row { [k: string]: unknown }

function SafeCell({ value }: { value: unknown }) {
  if (value == null) return <em style={{ color: "#888" }}>null</em>;
  if (typeof value === "object") return <code>{JSON.stringify(value)}</code>;
  return <span>{String(value)}</span>;
}

export default function VirtualTable({
  rows,
  columns,
  height = 400,
  rowHeight = 36
}: {
  rows: Row[];
  columns: string[];
  height?: number;
  rowHeight?: number;
}) {
  const RowRenderer = ({ index, style }: ListChildComponentProps) => {
    const r = rows[index];
    return (
      <Box role="row" style={style} sx={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, minmax(120px, 1fr))`, gap: 1, px: 1, py: 0.5, borderBottom: "1px solid #eee" }}>
        {columns.map((c) => (
          <Box key={c} role="cell" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            <SafeCell value={(r as any)[c]} />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Paper variant="outlined" sx={{ width: "100%", overflow: "hidden" }}>
      <Box role="row" sx={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, minmax(120px, 1fr))`, gap: 1, px: 1, py: 0.5, borderBottom: "1px solid #ddd", bgcolor: "#fafafa", position: "sticky", top: 0 }}>
        {columns.map((c) => <Typography key={c} role="columnheader" variant="body2" sx={{ fontWeight: 600 }}>{c}</Typography>)}
      </Box>
      <List height={height} itemCount={rows.length} itemSize={rowHeight} width={"100%"}>
        {RowRenderer}
      </List>
    </Paper>
  );
}
