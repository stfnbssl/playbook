import { CssBaseline, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MarkdownBrowserPage from "@/pages/MarkdownBrowserPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const router = createBrowserRouter([
  { path: "/docs", element: <MarkdownBrowserPage /> },
  { path: "*", element: <MarkdownBrowserPage /> }, // fallback alla lista
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60_000
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Markdown Browser</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <RouterProvider router={router} />
      </Container>
      {/* aria-live per annunci navigazione/dettaglio */}
      <div aria-live="polite" style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }} id="aria-live-region" />
    </QueryClientProvider>
  );
}
