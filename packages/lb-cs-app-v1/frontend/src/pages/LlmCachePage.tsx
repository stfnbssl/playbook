import { useEffect, useRef, useState } from "react";
import { Box, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Skeleton, Alert } from "@mui/material";
import { useLlmCacheList } from "@/api/llm";
import LlmCacheList from "@/components/LlmCacheList";
import LlmCacheDetail from "@/components/LlmCacheDetail";

export default function LlmCachePage() {
  const [q, setQ] = useState<string>("");
  const [provider, setProvider] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError } = useLlmCacheList({ q: q || undefined, provider: provider || undefined, model: model || undefined, skip: 0, limit: 50 });

  useEffect(() => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedId]);

  const items = data?.items ?? [];

  return (
    <Stack spacing={2}>
      <Box ref={topRef} />
      {!selectedId && (
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField size="small" label="Cerca (full-text)" value={q} onChange={(e) => setQ(e.target.value)} sx={{ minWidth: 260 }} />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="provider-label">Provider</InputLabel>
            <Select labelId="provider-label" label="Provider" value={provider} onChange={(e) => setProvider(e.target.value)}>
              <MenuItem value=""><em>Tutti</em></MenuItem>
              <MenuItem value="openai">openai</MenuItem>
              <MenuItem value="grok">grok</MenuItem>
              <MenuItem value="deepseek">deepseek</MenuItem>
            </Select>
          </FormControl>
          <TextField size="small" label="Model" value={model} onChange={(e) => setModel(e.target.value)} sx={{ minWidth: 200 }} />
        </Stack>
      )}

      {!selectedId && (
        <>
          {isLoading && <Skeleton variant="rectangular" height={160} />}
          {isError && <Alert severity="error">Errore nel caricamento della cache</Alert>}
          {!isLoading && !isError && <LlmCacheList items={items} onSelect={(id) => setSelectedId(id)} />}
        </>
      )}

      {selectedId && (
        <LlmCacheDetail id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </Stack>
  );
}
