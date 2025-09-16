import { Breadcrumbs, Typography, Paper, Button, Stack } from "@mui/material";
import { renderMarkdown } from "@/lib/markdown";
import { useLlmCacheItem } from "@/api/llm";
import { useMemo } from "react";

export default function LlmCacheDetail({
  id,
  onClose
}: {
  id: string;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useLlmCacheItem(id);
  const html = useMemo(() => (data?.result?.content ? renderMarkdown(data.result.content) : ""), [data]);

  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="Percorso cache">
        <Typography color="text.secondary">LLM Cache</Typography>
        <Typography color="text.primary">{id.slice(0,12)}…</Typography>
      </Breadcrumbs>

      {isLoading && <Typography>Caricamento...</Typography>}
      {isError && <Typography color="error">Errore nel caricamento del record.</Typography>}

      {data && (
        <>
          <Typography variant="body2" color="text.secondary">
            Provider: {data.provider} — Model: {data.model} — Created: {data.stats?.createdAt ? new Date(data.stats.createdAt).toLocaleString() : "-"}
          </Typography>
          <Paper elevation={0} sx={{ p: 2 }}>
            <div aria-label="Contenuto risposta" dangerouslySetInnerHTML={{ __html: html }} />
          </Paper>
        </>
      )}

      <Button variant="outlined" onClick={onClose} aria-label="Chiudi dettaglio">Chiudi</Button>
    </Stack>
  );
}
