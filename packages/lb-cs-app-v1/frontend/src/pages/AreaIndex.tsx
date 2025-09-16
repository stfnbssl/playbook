import { Typography, Stack, Card, CardContent } from "@mui/material";
import { Link, useParams } from "react-router-dom";

export default function AreaIndex() {
  const { areaId } = useParams();
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Indice Area {areaId}</Typography>
      <Card><CardContent>
        <ul>
          <li><Link to={`/area/${areaId}/section/1`}>Sezione 1</Link></li>
          <li><Link to={`/area/${areaId}/section/2`}>Sezione 2</Link></li>
        </ul>
      </CardContent></Card>
    </Stack>
  );
}
