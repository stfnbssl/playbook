import { useQuery } from "@tanstack/react-query";

export interface VersionItem {
  versione: number;
  data: string; // ISO
}
export interface LatestItem {
  nome: string;
  ultimaVersione: number;
  dataUltimaVersione: string;
}
export interface MarkdownDoc {
  categoria: string;
  nome: string;
  contenuto: string;
  data: string;
  versione: number;
}

async function getJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export function useCategories() {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getJSON<string[]>("/api/categories", signal),
    staleTime: 5 * 60 * 1000
  });
}

export function useLatestByCategory(category: string | null) {
  return useQuery<LatestItem[]>({
    enabled: !!category,
    queryKey: ["latest", category],
    queryFn: ({ signal }) => getJSON<LatestItem[]>(`/api/markdowns?category=${encodeURIComponent(category!)}`, signal),
    staleTime: 60 * 1000
  });
}

export function useVersions(category: string, nome: string) {
  return useQuery<VersionItem[]>({
    queryKey: ["versions", category, nome],
    queryFn: ({ signal }) => getJSON<VersionItem[]>(`/api/markdowns/${encodeURIComponent(nome)}/versions?category=${encodeURIComponent(category)}`, signal),
    staleTime: 60 * 1000
  });
}

export function useMarkdownDoc(category: string, nome: string, version?: number) {
  const v = version != null ? `&version=${version}` : "";
  return useQuery<MarkdownDoc>({
    queryKey: ["doc", category, nome, version ?? "latest"],
    queryFn: ({ signal }) => getJSON<MarkdownDoc>(`/api/markdowns/${encodeURIComponent(nome)}?category=${encodeURIComponent(category)}${v}`, signal),
    staleTime: 30 * 1000
  });
}
