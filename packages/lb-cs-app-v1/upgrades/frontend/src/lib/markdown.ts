import { marked } from "marked";
import DOMPurify from "dompurify";

export function renderMarkdownToSafeHtml(markdown: string): string {
  const raw = marked.parse(markdown, { async: false }) as string;
  const safe = DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
  return safe;
}
