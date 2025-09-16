import { Typography, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";

export default function PageView() {
  const { areaId, sectionId, pageId } = useParams();
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Contenuto di Area {areaId} - Sezione {sectionId} - Pagina {pageId}
        </Typography>
        <Typography>(Contenuto DUMMY per struttura di navigazione a tre livelli.)</Typography>
      </CardContent>
    </Card>
  );
}
