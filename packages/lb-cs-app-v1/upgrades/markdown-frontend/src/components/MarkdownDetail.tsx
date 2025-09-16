import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs, Link as MUILink, Typography, Stack, FormControl, InputLabel, Select, MenuItem, Button, Paper } from "@mui/material";
import { useMarkdownDoc, useVersions } from "@/api/markdowns";
import { renderMarkdown } from "@/lib/markdown";

export default function MarkdownDetail({
  category,
  name,
  onClose,
}: {
  category: string;
  name: string;
  onClose: () => void;
}) {
  const { data: versions } = useVersions(category, name);
  const latestVersion = versions?.[0]?.versione ?? null;

  const [selectedVersion, setSelectedVersion] = useState<number | null>(latestVersion);
  useEffect(() => {
    setSelectedVersion(latestVersion);
  }, [latestVersion]);

  const { data: doc, isLoading, isError } = useMarkdownDoc(category, name, selectedVersion ?? undefined);

  const html = useMemo(() => (doc ? renderMarkdown(doc.contenuto) : ""), [doc]);

  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="Percorso documento">
        <Typography color="text.secondary">{category}</Typography>
        <Typography color="text.primary">{name}</Typography>
      </Breadcrumbs>

      <FormControl size="small" sx={{ width: 240 }}>
        <InputLabel id="version-label">Versione</InputLabel>
        <Select
          labelId="version-label"
          label="Versione"
          value={selectedVersion ?? ""}
          onChange={(e) => setSelectedVersion(Number(e.target.value))}
        >
          {versions?.map(v => (
            <MenuItem key={v.versione} value={v.versione}>
              v{v.versione} — {new Date(v.data).toLocaleString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {isLoading && <Typography>Caricamento...</Typography>}
      {isError && <Typography color="error">Errore nel caricamento del documento.</Typography>}

      {doc && (
        <Paper elevation={0} sx={{ p: 2 }}>
          <div
            aria-label="Contenuto documento"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Paper>
      )}

      <Button variant="outlined" onClick={onClose} aria-label="Chiudi dettaglio">
        Chiudi
      </Button>
    </Stack>
  );
}
