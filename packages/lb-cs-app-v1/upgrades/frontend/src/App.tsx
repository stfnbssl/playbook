import { CssBaseline, Container } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MarkdownBrowserPage from "@/pages/MarkdownBrowserPage";

const qc = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <header style={{ marginBottom: 16 }}>
            <nav aria-label="main-nav">
              <Link to="/docs">Docs</Link>
            </nav>
          </header>
          <Routes>
            <Route path="/docs" element={<MarkdownBrowserPage />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
