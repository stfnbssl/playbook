import { Typography, Stack, Card, CardContent } from "@mui/material";
import { Link, useParams } from "react-router-dom";

export default function SectionIndex() {
  const { areaId, sectionId } = useParams();
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Indice Sezione {sectionId} — Area {areaId}</Typography>
      <Card><CardContent>
        <ul>
          <li><Link to={`/area/${areaId}/section/${sectionId}/page/1`}>Pagina 1</Link></li>
          <li><Link to={`/area/${areaId}/section/${sectionId}/page/2`}>Pagina 2</Link></li>
        </ul>
      </CardContent></Card>
    </Stack>
  );
}
