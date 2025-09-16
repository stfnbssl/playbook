import { Breadcrumbs, Link as MUILink, Typography, Box } from "@mui/material";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";

export default function Layout() {
  const { areaId: pArea, sectionId: pSection, pageId: pPage } = useParams();
  const { pathname } = useLocation();
  // Fallback: se i param non ci sono (route statica), derivali dall'URL
  let areaId = pArea;
  let sectionId = pSection;
  let pageId = pPage;
  if (!areaId || !sectionId || !pageId) {
    const parts = pathname.split("/").filter(Boolean); // ["area","progetto","section","Documenti","page","docs"]
    if (parts[0] === "area") {
      areaId = areaId ?? parts[1];
      if (parts[2] === "section") sectionId = sectionId ?? parts[3];
      if (parts[4] === "page") pageId = pageId ?? parts[5];
    }
  }
  return (
    <Box component="main" sx={{ width: "100%" }}>
      <Box component="header" sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumbs">
          <MUILink component={Link} to="/">Home</MUILink>
          {areaId ? (
            <MUILink component={Link} to={`/area/${areaId}`}>Area {areaId}</MUILink>
          ) : null}
          {areaId && sectionId ? (
            <MUILink component={Link} to={`/area/${areaId}/section/${sectionId}`}>Sezione {sectionId}</MUILink>
          ) : null}
          {areaId && sectionId && pageId ? (
            <Typography color="text.primary">Pagina {pageId}</Typography>
          ) : null}
        </Breadcrumbs>
      </Box>
      <Outlet />
    </Box>
  );
}
