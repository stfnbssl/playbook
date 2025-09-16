import App from "@/App";
import { createBrowserRouter, Link } from "react-router-dom";
import Layout from "@/layout/Layout";
import { Typography, Stack, Card, CardContent } from "@mui/material";
import AreaIndex from "@/pages/AreaIndex";
import SectionIndex from "@/pages/SectionIndex";
import PageView from "@/pages/PageView";
import About from "@/routes/About";
import MarkdownBrowserPage from "@/pages/MarkdownBrowserPage";
import LlmCachePage from "@/pages/LlmCachePage";
import DatasetsPage from "@/pages/DatasetsPage";
import DatasetDetailPage from "@/pages/DatasetDetailPage";

function Home() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">LB Cybersecurity — Demo routing</Typography>
      <Card><CardContent>
        <Typography variant="h6">Esempi rapidi</Typography>
        <ul>
          <li><Link to="/area/A">Area A</Link></li>
          <li><Link to="/area/B">Area B</Link></li>
          <li><Link to="/area/C">Area C</Link></li>
          <li><Link to="/area/progetto/section/documenti/page/docs">Markdowns</Link></li>
          <li><Link to="/area/progetto/section/documenti/page/json">JSONs</Link></li>
          <li><Link to="/area/progetto/section/llm/page/cache">LLM Cache</Link></li>
          {/*<li><Link to="/area/A/section/1/page/1">Area A / Sezione 1 / Pagina 1</Link></li>
          <li><Link to="/area/A/section/1/page/2">Area A / Sezione 1 / Pagina 2</Link></li>
          <li><Link to="/area/A/section/2/page/1">Area A / Sezione 2 / Pagina 1</Link></li>
          <li><Link to="/area/B/section/1/page/1">Area B / Sezione 1 / Pagina 1</Link></li>
          <li><Link to="/area/B/section/2/page/2">Area B / Sezione 2 / Pagina 2</Link></li>
          <li><Link to="/area/C/section/2/page/1">Area C / Sezione 2 / Pagina 1</Link></li>*/}
        </ul>
      </CardContent></Card>
    </Stack>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,          // shell globale con AppBar + <Outlet/>
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },

      // blocco gerarchia 3 livelli con layout + breadcrumbs
      {
        element: <Layout />,
        children: [
          // ✅ entry point specifico per i documenti di "progetto"
          {
            path: "area/progetto/section/documenti/page/docs",
            element: <MarkdownBrowserPage />,
          },
          {
            path: "area/progetto/section/llm/page/cache",
            element: <LlmCachePage />,
          },
          {
            path: "area/progetto/section/documenti/page/json",
            element: <DatasetsPage />,
          },
          {
            path: "area/progetto/section/documenti/page/json/:id",
            element: <DatasetDetailPage />,
          },          
          // rotte generiche a 3 livelli          
          { path: "area/:areaId", element: <AreaIndex /> },
          { path: "area/:areaId/section/:sectionId", element: <SectionIndex /> },
          { path: "area/:areaId/section/:sectionId/page/:pageId", element: <PageView /> },
        ],
      },
      { path: "*", element: <Typography>404 - Pagina non trovata</Typography> },
    ],
  },
]);

export default router;

/*
export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="area/:areaId" element={<AreaIndex />} />
        <Route path="area/:areaId/section/:sectionId" element={<SectionIndex />} />
        <Route path="area/:areaId/section/:sectionId/page/:pageId" element={<PageView />} />
        <Route path="*" element={<Typography>404 - Pagina non trovata</Typography>} />
      </Route>
    </Routes>
  );
}
*/

/*
const router = createBrowserRouter([
  { path: "/docs", element: <MarkdownBrowserPage /> },
  { path: "*", element: <MarkdownBrowserPage /> }, // fallback alla lista
]);
*/

