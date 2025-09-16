import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layout/Layout";
import PageView from "@/pages/PageView";

describe("Routing & Breadcrumbs", () => {
  it("mostra i breadcrumbs", () => {
    render(
      <MemoryRouter initialEntries={["/area/A/section/1/page/1"]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="area/:areaId/section/:sectionId/page/:pageId" element={<PageView />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const bc = screen.getByLabelText(/breadcrumbs/i);
    expect(bc).toBeInTheDocument();
  });

  it("renderizza il contenuto dummy della pagina", () => {
    render(
      <MemoryRouter initialEntries={["/area/B/section/2/page/1"]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="area/:areaId/section/:sectionId/page/:pageId" element={<PageView />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Contenuto di Area B - Sezione 2 - Pagina 1/i)).toBeInTheDocument();
  });
});
