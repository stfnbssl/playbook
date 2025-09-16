import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Select, MenuItem, InputLabel, FormControl, Stack, TextField, Skeleton, Alert } from "@mui/material";
import { useCategories, useLatestByCategory } from "@/api/markdowns";
import MarkdownList from "@/components/MarkdownList";
import MarkdownDetail from "@/components/MarkdownDetail";

export default function MarkdownBrowserPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("");
  const listTopRef = useRef<HTMLDivElement | null>(null);

  const { data: categories, isLoading: catLoading, isError: catError, error: catErrorObj } = useCategories();
  const { data: latest, isLoading: listLoading, isError: listError, error: listErrorObj } = useLatestByCategory(selectedCategory);

  // reset name when category changes
  useEffect(() => {
    setSelectedName(null);
    if (listTopRef.current) listTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedCategory]);

  const filtered = useMemo(() => {
    if (!latest) return [];
    const q = search.trim().toLowerCase();
    if (!q) return latest;
    return latest.filter(i => i.nome.toLowerCase().includes(q));
  }, [latest, search]);

  const handleOpenDetail = (nome: string) => {
    setSelectedName(nome);
    const live = document.getElementById("aria-live-region");
    if (live) live.textContent = `Aperto dettaglio documento ${nome}`;
  };

  const handleCloseDetail = () => {
    setSelectedName(null);
    const live = document.getElementById("aria-live-region");
    if (live) live.textContent = `Chiusa vista dettaglio`;
  };

  return (
    <Stack spacing={2}>
      <Box ref={listTopRef} />
      <FormControl size="small" sx={{ width: 280 }}>
        <InputLabel id="category-label">Categoria</InputLabel>
        <Select
          labelId="category-label"
          label="Categoria"
          value={selectedCategory ?? ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          displayEmpty
        >
          <MenuItem value=""><em>Seleziona categoria</em></MenuItem>
          {catLoading && <MenuItem value="" disabled>Caricamento...</MenuItem>}
          {catError && <MenuItem value="" disabled>Errore nel caricamento</MenuItem>}
          {categories?.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
        {/* Messaggio standalone sotto la select */}
        {catError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {(catErrorObj as Error)?.message ?? "Errore caricamento categorie"}
          </Alert>
        )}
      </FormControl>

      {!selectedName && (
        <TextField
          size="small"
          label="Cerca nome"
          placeholder="Cerca per nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: 360 }}
        />
      )}

      {/* Lista */}
      {!selectedName && (
        <>
          {listLoading && <Skeleton variant="rectangular" height={160} />}
          {/* listError && <Alert severity="error">Errore nel caricamento della lista</Alert> */}
          {/* Messaggio standalone sotto la select */}
          {catError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {(catErrorObj as Error)?.message ?? "Errore caricamento categorie"}
            </Alert>
          )}
          {!!selectedCategory && latest && (
            <MarkdownList
              items={filtered}
              onSelect={(nome) => handleOpenDetail(nome)}
            />
          )}
        </>
      )}

      {/* Dettaglio */}
      {selectedCategory && selectedName && (
        <MarkdownDetail
          category={selectedCategory}
          name={selectedName}
          onClose={handleCloseDetail}
        />
      )}
    </Stack>
  );
}


