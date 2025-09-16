import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LlmCachePage from "@/pages/LlmCachePage";

const router = createBrowserRouter([
  { path: "/llm-cache", element: <LlmCachePage /> },
  { path: "*", element: <LlmCachePage /> }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1, staleTime: 60_000 }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>LLM Cache</Typography>
          <Button color="inherit" component={Link} to="/llm-cache">Cache</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <RouterProvider router={router} />
      </Container>
      <div aria-live="polite" style={{ position: "absolute", left: -9999 }} id="aria-live-region" />
    </QueryClientProvider>
  );
}
