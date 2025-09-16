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

  // Ricostruisce il prompt combinando system + user
  const prompt = useMemo(() => {
    if (!data?.input?.messages) return "";
    const arr = data.input.messages as Array<{ role?: string; content?: string }>;
    const sys = arr.find((m) => m.role === "system")?.content || "";
    const user = arr.find((m) => m.role === "user")?.content || "";
    let combined = "";
    if (sys) combined += `[SYSTEM]\n${sys}\n\n`;
    if (user) combined += `[USER]\n${user}`;
    return combined.trim();
  }, [data]);

  const htmlPrompt = useMemo(
    () => (prompt ? renderMarkdown(prompt) : ""),
    [prompt]
  );
  const htmlResult = useMemo(
    () => (data?.result?.content ? renderMarkdown(data.result.content) : ""),
    [data]
  );

  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="Percorso cache">
        <Typography color="text.secondary">LLM Cache</Typography>
        <Typography color="text.primary">{id.slice(0, 12)}…</Typography>
      </Breadcrumbs>

      {isLoading && <Typography>Caricamento...</Typography>}
      {isError && (
        <Typography color="error">Errore nel caricamento del record.</Typography>
      )}

      {data && (
        <>
          <Typography variant="body2" color="text.secondary">
            Provider: {data.provider} — Model: {data.model} — Created:{" "}
            {data.stats?.createdAt
              ? new Date(data.stats.createdAt).toLocaleString()
              : "-"}
          </Typography>

          {prompt && (
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Prompt
              </Typography>
              <div
                aria-label="Prompt combinato"
                dangerouslySetInnerHTML={{ __html: htmlPrompt }}
              />
            </Paper>
          )}

          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Risultato
            </Typography>
            <div
              aria-label="Contenuto risposta"
              dangerouslySetInnerHTML={{ __html: htmlResult }}
            />
          </Paper>
        </>
      )}

      <Button
        variant="outlined"
        onClick={onClose}
        aria-label="Chiudi dettaglio"
      >
        Chiudi
      </Button>
    </Stack>
  );
}
