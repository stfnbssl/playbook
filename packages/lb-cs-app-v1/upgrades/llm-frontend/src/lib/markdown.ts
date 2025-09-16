import { marked } from "marked";
import DOMPurify from "dompurify";

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md, { breaks: true });
  return DOMPurify.sanitize(String(raw));
}
