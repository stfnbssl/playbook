import { useQuery } from "@tanstack/react-query";

export interface DatasetMeta {
  _id: string;
  title?: string;
  createdAt: string;
  stats: { count: number; paths: Array<{ path: string; types: string[] }> };
  schema: unknown;
}

export interface DatasetsListResponse {
  items: Array<Omit<DatasetMeta, "schema">>;
  total: number;
}

export interface DatasetDataChunk {
  datasetId: string;
  chunkIndex: number;
  data: unknown[];
}

export interface DatasetDataResponse {
  items: Array<{ datasetId: string; chunkIndex: number; data: unknown[] }>;
  total: number;
}

async function getJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const r = await fetch(url, { signal });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

export function useDatasets(params: { skip?: number; limit?: number }) {
  const search = new URLSearchParams();
  if (params.skip != null) search.set("skip", String(params.skip));
  if (params.limit != null) search.set("limit", String(params.limit));
  const url = `/api/json/datasets${search.toString() ? "?" + search.toString() : ""}`;
  return useQuery<DatasetsListResponse>({
    queryKey: ["datasets", params],
    queryFn: ({ signal }) => getJSON<DatasetsListResponse>(url, signal),
    staleTime: 60_000
  });
}

export function useDatasetMeta(id: string | null) {
  return useQuery<DatasetMeta>({
    enabled: !!id,
    queryKey: ["dataset-meta", id],
    queryFn: ({ signal }) => getJSON<DatasetMeta>(`/api/json/datasets/${id}/meta`, signal),
    staleTime: 60_000
  });
}

export function useDatasetSlice(id: string | null, skip: number, limit: number) {
  return useQuery<DatasetDataResponse>({
    enabled: !!id,
    queryKey: ["dataset-slice", id, skip, limit],
    queryFn: ({ signal }) => getJSON<DatasetDataResponse>(`/api/json/datasets/${id}/data?skip=${skip}&limit=${limit}`, signal),
    staleTime: 30_000
  });
}

export function useDatasetPrompt(id: string | null) {
  return useQuery<string>({
    enabled: !!id,
    queryKey: ["dataset-prompt", id],
    queryFn: async ({ signal }) => {
      const r = await fetch(`/api/json/datasets/${id}/prompt`, { signal });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    },
    staleTime: 5 * 60_000
  });
}
