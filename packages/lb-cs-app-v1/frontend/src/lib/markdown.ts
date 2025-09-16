import { marked } from "marked";
import DOMPurify from "dompurify";

// Render markdown -> HTML e poi sanitizza (client-side)
export function renderMarkdown(md: string): string {
  const raw = marked.parse(md, { breaks: true });
  // DOMPurify accetta stringa; in ambienti SSR bisogna usare JSDOM, ma qui siamo client.
  const clean = DOMPurify.sanitize(String(raw));
  return clean;
}
