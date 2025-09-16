import React from "react";
import { CssBaseline, Container, AppBar, Toolbar, Typography, Breadcrumbs, Link as MUILink } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DatasetsPage from "@/pages/DatasetsPage";
import DatasetDetailPage from "@/pages/DatasetDetailPage";

const router = createBrowserRouter([
  { path: "/json", element: <DatasetsPage /> },
  { path: "/json/:id", element: <DatasetDetailPage /> },
  { path: "*", element: <DatasetsPage /> }
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1, staleTime: 60_000 } }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>JSON Insight UI</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "inherit" }}>
            <MUILink underline="hover" color="inherit" href="/json">Datasets</MUILink>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <RouterProvider router={router} />
      </Container>
      <div aria-live="polite" style={{ position: "absolute", left: -9999 }} id="aria-live-region" />
    </QueryClientProvider>
  );
}
