import { Button, Snackbar } from "@mui/material";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={async () => { await navigator.clipboard.writeText(text); setOpen(true); }}>Copia</Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)} message="Copiato negli appunti" />
    </>
  );
}
