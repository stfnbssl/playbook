import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, Container } from "@mui/material";
import { store } from "@/store";
import router from "@/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60_000
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Container maxWidth="md">
          <RouterProvider router={router} />
        </Container>
        {/* aria-live per annunci navigazione/dettaglio */}
        <div aria-live="polite" style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }} id="aria-live-region" />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

/*
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
      {/* aria-live per annunci navigazione/dettaglio *//*}
      <div aria-live="polite" style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }} id="aria-live-region" />
    </QueryClientProvider>
  );
}
*/