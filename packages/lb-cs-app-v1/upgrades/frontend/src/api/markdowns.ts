import { useQuery } from "@tanstack/react-query";

export interface LatestRow {
  nome: string;
  ultimaVersione: number;
  dataUltimaVersione: string;
}
export interface VersionItem {
  versione: number;
  data: string;
}
export interface MarkdownDoc {
  categoria: string;
  nome: string;
  contenuto: string;
  data: string;
  versione: number;
}

const BASE = import.meta.env.VITE_API_BASE || "";

async function json<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export function useCategories() {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: () => json<string[]>(`${BASE}/api/categories`),
    staleTime: 60_000
  });
}

export function useLatestByCategory(category: string | null) {
  return useQuery<LatestRow[]>({
    enabled: !!category,
    queryKey: ["latest", category],
    queryFn: () => json<LatestRow[]>(`${BASE}/api/markdowns?category=${encodeURIComponent(category!)}`),
    staleTime: 30_000
  });
}

export function useVersions(category: string | null, name: string | null) {
  return useQuery<VersionItem[]>({
    enabled: !!category && !!name,
    queryKey: ["versions", category, name],
    queryFn: () => json<VersionItem[]>(`${BASE}/api/markdowns/${encodeURIComponent(name!)}/versions?category=${encodeURIComponent(category!)}`),
    staleTime: 30_000
  });
}

export function useMarkdownDoc(category: string | null, name: string | null, version: number | null) {
  return useQuery<MarkdownDoc>({
    enabled: !!category && !!name && !!version,
    queryKey: ["doc", category, name, version],
    queryFn: () => json<MarkdownDoc>(`${BASE}/api/markdowns/${encodeURIComponent(name!)}` + `?category=${encodeURIComponent(category!)}` + `&version=${encodeURIComponent(version!)}`),
    staleTime: 10_000
  });
}
