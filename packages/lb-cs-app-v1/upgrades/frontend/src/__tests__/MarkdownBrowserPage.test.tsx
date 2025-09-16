import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import MarkdownBrowserPage from "@/pages/MarkdownBrowserPage";

const mockFetch = vi.fn();
global.fetch = mockFetch as any;

function renderPage() {
  const qc = new QueryClient();
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={["/docs"]}>
        <MarkdownBrowserPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  vi.resetAllMocks();
  mockFetch.mockImplementation((url: string) => {
    if (url.endsWith("/api/categories")) {
      return Promise.resolve(new Response(JSON.stringify(["guides", "reports"])) as any);
    }
    if (url.includes("/api/markdowns?category=")) {
      const rows = [
        { nome: "installazione", ultimaVersione: 3, dataUltimaVersione: "2025-09-01T10:00:00Z" },
        { nome: "configurazione", ultimaVersione: 2, dataUltimaVersione: "2025-09-03T12:00:00Z" }
      ];
      return Promise.resolve(new Response(JSON.stringify(rows)) as any);
    }
    if (url.includes("/versions?")) {
      const versions = [
        { versione: 3, data: "2025-09-01T10:00:00Z" },
        { versione: 2, data: "2025-08-20T09:00:00Z" }
      ];
      return Promise.resolve(new Response(JSON.stringify(versions)) as any);
    }
    if (url.includes("/api/markdowns/installazione?")) {
      const params = new URL("http://x" + url).searchParams;
      const v = Number(params.get("version"));
      const doc = {
        categoria: "guides",
        nome: "installazione",
        versione: v,
        data: "2025-09-01T10:00:00Z",
        contenuto: v === 3 ? "# Titolo\nV3" : "# Titolo\nV2"
      };
      return Promise.resolve(new Response(JSON.stringify(doc)) as any);
    }
    return Promise.resolve(new Response("Not Found", { status: 404 }) as any);
  });
});

describe("MarkdownBrowserPage", () => {
  it("mostra lista con ultimaVersione per categoria selezionata", async () => {
    renderPage();
    await waitFor(() => expect(screen.getByRole("table", { name: /markdown-list/i })).toBeInTheDocument());
    expect(screen.getByText(/installazione/i)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it("apre il dettaglio con breadcrumb e select versioni", async () => {
    renderPage();
    await waitFor(() => screen.getByRole("table", { name: /markdown-list/i }));
    fireEvent.click(screen.getByLabelText("open-installazione"));
    await waitFor(() => expect(screen.getByLabelText(/breadcrumbs/i)).toBeInTheDocument());
    expect(screen.getByLabelText("select-version")).toBeInTheDocument();
  });

  it("cambiando versione cambia il contenuto renderizzato", async () => {
    renderPage();
    await waitFor(() => screen.getByRole("table", { name: /markdown-list/i }));
    fireEvent.click(screen.getByLabelText("open-installazione"));
    await waitFor(() => screen.getByLabelText("select-version"));
    const select = screen.getByLabelText("select-version"); 
    fireEvent.mouseDown(select);
    const option = await screen.findByText(/v2/i);
    fireEvent.click(option);
    await waitFor(() => expect(screen.getByText("V2")).toBeInTheDocument());
  });

  it("il bottone Chiudi torna alla lista mantenendo categoria", async () => {
    renderPage();
    await waitFor(() => screen.getByRole("table", { name: /markdown-list/i }));
    fireEvent.click(screen.getByLabelText("open-installazione"));
    const closeBtn = await screen.findByLabelText("close-detail"); 
    fireEvent.click(closeBtn);
    await waitFor(() => expect(screen.getByRole("table", { name: /markdown-list/i })).toBeInTheDocument());
    expect(screen.getByRole("combobox", { name: /select-category/i })).toBeInTheDocument();
  });
});
