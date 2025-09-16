import { useQuery } from "@tanstack/react-query";

export interface LlmCacheItem {
  _id: string;
  provider: string;
  model: string;
  stats?: { createdAt: string; hits: number; lastHitAt?: string };
  result?: { content?: string };
  snippet?: string;
}

export interface LlmCacheListResponse {
  items: LlmCacheItem[];
  total: number;
}

async function getJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const r = await fetch(url, { signal });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

export function useLlmCacheList(params: { q?: string; provider?: string; model?: string; skip?: number; limit?: number }) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.provider) search.set("provider", params.provider);
  if (params.model) search.set("model", params.model);
  if (params.skip != null) search.set("skip", String(params.skip));
  if (params.limit != null) search.set("limit", String(params.limit));
  const url = `/api/llm/cache${search.toString() ? "?" + search.toString() : ""}`;
  return useQuery<LlmCacheListResponse>({
    queryKey: ["llm-cache", params],
    queryFn: ({ signal }) => getJSON<LlmCacheListResponse>(url, signal),
    staleTime: 60_000
  });
}

export function useLlmCacheItem(id: string | null) {
  return useQuery<LlmCacheItem>({
    enabled: !!id,
    queryKey: ["llm-cache-item", id],
    queryFn: ({ signal }) => getJSON<LlmCacheItem>(`/api/llm/cache/${encodeURIComponent(id!)}`, signal),
    staleTime: 60_000
  });
}
