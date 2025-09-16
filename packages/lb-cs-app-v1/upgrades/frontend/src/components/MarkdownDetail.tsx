import { useEffect, useMemo } from "react";
import { Breadcrumbs, Link as MUILink, Typography, Box, Select, MenuItem, Button, Stack, Alert, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useVersions, useMarkdownDoc } from "@/api/markdowns";
import { renderMarkdownToSafeHtml } from "@/lib/markdown";

export interface MarkdownDetailProps {
  category: string;
  name: string;
  version: number | null;
  onChangeVersion: (v: number) => void;
  onClose: () => void;
}

export default function MarkdownDetail({ category, name, version, onChangeVersion, onClose }: MarkdownDetailProps) {
  const { data: versions, isLoading: versionsLoading, isError: versionsError } = useVersions(category, name);

  useEffect(() => {
    if (!versionsLoading && versions && versions.length > 0 && !version) {
      onChangeVersion(versions[0].versione);
    }
  }, [versionsLoading, versions, version, onChangeVersion]);

  const { data: doc, isLoading: docLoading, isError: docError } = useMarkdownDoc(category, name, version);

  const html = useMemo(() => {
    if (!doc) return "";
    return renderMarkdownToSafeHtml(doc.contenuto);
  }, [doc]);

  return (
    <Box>
      <Box component="header" sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumbs">
          <MUILink component={Link} to="/docs">{category}</MUILink>
          <Typography color="text.primary">{name}</Typography>
        </Breadcrumbs>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        {versionsLoading ? (
          <Skeleton variant="rounded" width={200} height={40} />
        ) : versionsError ? (
          <Alert severity="error">Errore nel caricamento versioni</Alert>
        ) : (
          <Select
            size="small"
            value={version ?? ""}
            onChange={(e) => onChangeVersion(Number(e.target.value))}
            displayEmpty
            aria-label="select-version"
          >
            {versions?.map(v => (
              <MenuItem key={v.versione} value={v.versione}>
                v{v.versione} — {new Date(v.data).toLocaleString()}
              </MenuItem>
            ))}
          </Select>
        )}
        <Button variant="outlined" onClick={onClose} aria-label="close-detail">Chiudi</Button>
      </Stack>

      {docLoading ? (
        <Stack spacing={1}>
          <Skeleton height={28} />
          <Skeleton height={24} />
          <Skeleton height={24} />
          <Skeleton height={24} />
        </Stack>
      ) : docError ? (
        <Alert severity="error">Errore nel caricamento documento</Alert>
      ) : (
        <Box aria-live="polite" aria-busy={docLoading} sx={{ "& h1,h2,h3": { mt: 2 } }}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Box>
      )}
    </Box>
  );
}
