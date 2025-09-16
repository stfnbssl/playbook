import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Select, MenuItem, Stack, Alert, Skeleton, Typography } from "@mui/material";
import MarkdownList from "@/components/MarkdownList";
import MarkdownDetail from "@/components/MarkdownDetail";
import { useCategories, useLatestByCategory } from "@/api/markdowns";

export default function MarkdownBrowserPage() {
  const { data: categories, isLoading: catLoading, isError: catError } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);

  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const lastScroll = useRef<number>(0);

  const { data: rows, isLoading: listLoading, isError: listError } = useLatestByCategory(selectedCategory);

  useEffect(() => {
    if (!catLoading && categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [catLoading, categories, selectedCategory]);

  useEffect(() => {
    setSelectedName(null);
    setSelectedVersion(null);
    if (listContainerRef.current) listContainerRef.current.scrollTop = 0;
  }, [selectedCategory]);

  const showList = useMemo(() => !selectedName, [selectedName]);

  return (
    <Box>
      <Box component="header" sx={{ mb: 2 }}>
        <Typography variant="h5">Markdown Browser</Typography>
      </Box>

      <Stack spacing={2}>
        {catLoading ? (
          <Skeleton variant="rounded" width={220} height={40} />
        ) : catError ? (
          <Alert severity="error">Errore nel caricamento categorie</Alert>
        ) : (
          <Select
            size="small"
            value={selectedCategory ?? ""}
            onChange={(e) => setSelectedCategory(String(e.target.value))}
            aria-label="select-category"
            displayEmpty
            sx={{ maxWidth: 300 }}
          >
            {categories?.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        )}

        {showList ? (
          listLoading ? (
            <Stack spacing={1}>
              <Skeleton height={32} />
              <Skeleton height={28} />
              <Skeleton height={28} />
            </Stack>
          ) : listError ? (
            <Alert severity="error">Errore nel caricamento lista</Alert>
          ) : (
            <Box ref={listContainerRef}>
              {rows && (
                <MarkdownList
                  rows={rows}
                  onOpen={(name) => {
                    lastScroll.current = listContainerRef.current?.scrollTop || 0;
                    setSelectedName(name);
                  }}
                />
              )}
            </Box>
          )
        ) : (
          <MarkdownDetail
            category={selectedCategory!}
            name={selectedName!}
            version={selectedVersion}
            onChangeVersion={setSelectedVersion}
            onClose={() => {
              setSelectedName(null);
              if (listContainerRef.current) listContainerRef.current.scrollTop = lastScroll.current;
            }}
          />
        )}
      </Stack>
    </Box>
  );
}
