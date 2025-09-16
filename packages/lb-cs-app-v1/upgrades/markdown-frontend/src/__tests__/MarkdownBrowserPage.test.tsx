import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, within, fireEvent, waitFor } from "@testing-library/react";
import App from "@/App";

// Mock fetch per risposte API
const routes = {
  "/api/categories": [ "guides", "reports" ],
  "/api/markdowns?category=guides": [
    { nome: "installazione", ultimaVersione: 3, dataUltimaVersione: "2025-09-01T10:00:00Z" },
    { nome: "configurazione", ultimaVersione: 2, dataUltimaVersione: "2025-08-20T09:00:00Z" }
  ],
  "/api/markdowns/installazione/versions?category=guides": [
    { versione: 3, data: "2025-09-01T10:00:00Z" },
    { versione: 2, data: "2025-08-20T09:00:00Z" }
  ],
};

function docUrl(version?: number) {
  const base = "/api/markdowns/installazione?category=guides";
  return version ? `${base}&version=${version}` : base;
}

beforeEach(() => {
  global.fetch = vi.fn(async (input: RequestInfo) => {
    const url = typeof input === "string" ? input : input.url;
    if (url in routes) {
      return new Response(JSON.stringify(routes[url as keyof typeof routes]), { status: 200 });
    }
    if (url.startsWith(docUrl())) {
      const vParam = new URL("http://x" + url).searchParams.get("version");
      const v = vParam ? Number(vParam) : 3;
      const body = {
        categoria: "guides",
        nome: "installazione",
        versione: v,
        data: v === 3 ? "2025-09-01T10:00:00Z" : "2025-08-20T09:00:00Z",
        contenuto: v === 3 ? "# Titolo v3\nContenuto v3" : "# Titolo v2\nContenuto v2"
      };
      return new Response(JSON.stringify(body), { status: 200 });
    }
    return new Response("Not Found", { status: 404 });
  }) as unknown as typeof fetch;
});

function openCategory(category: string) {
  const select = screen.getByLabelText("Categoria");
  fireEvent.mouseDown(select);
  const listbox = screen.getByRole("listbox");
  fireEvent.click(within(listbox).getByText(category));
}

describe("MarkdownBrowserPage", () => {
  it("mostra lista nomi e ultima versione per categoria", async () => {
    render(<App />);
    // naviga alla pagina /docs
    window.history.pushState({}, "", "/docs");

    openCategory("guides");

    const table = await screen.findByRole("table");
    const rows = within(table).getAllByRole("row");
    // header + 2 righe
    expect(rows.length).toBeGreaterThan(2 - 1); // almeno header + 1 riga
    expect(await screen.findByText("installazione")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("apre dettaglio con breadcrumb e select versioni al click su un nome", async () => {
    render(<App />);
    window.history.pushState({}, "", "/docs");

    openCategory("guides");
    const row = await screen.findByText("installazione");
    fireEvent.click(row);

    expect(await screen.findByLabelText(/Percorso documento/i)).toBeInTheDocument();
    const versionSelect = screen.getByLabelText("Versione");
    expect(versionSelect).toBeInTheDocument();
  });

  it("cambia contenuto al cambio versione", async () => {
    render(<App />);
    window.history.pushState({}, "", "/docs");

    openCategory("guides");
    const row = await screen.findByText("installazione");
    fireEvent.click(row);

    // default v3
    await screen.findByText(/Contenuto v3/);

    const versionSelect = screen.getByLabelText("Versione");
    fireEvent.mouseDown(versionSelect);
    const listbox = screen.getByRole("listbox");
    fireEvent.click(within(listbox).getByText(/v2/));

    await screen.findByText(/Contenuto v2/);
  });

  it("chiudi torna alla lista mantenendo categoria", async () => {
    render(<App />);
    window.history.pushState({}, "", "/docs");

    openCategory("guides");
    const row = await screen.findByText("installazione");
    fireEvent.click(row);

    const closeBtn = await screen.findByRole("button", { name: /Chiudi dettaglio/i });
    fireEvent.click(closeBtn);

    // torna la tabella e resta la categoria selezionata
    expect(await screen.findByRole("table")).toBeInTheDocument();
    const select = screen.getByLabelText("Categoria") as HTMLInputElement;
    expect(select).toBeTruthy();
  });
});
