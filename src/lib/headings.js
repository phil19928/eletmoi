import { slugifyHeading } from "./slugify.js";

/**
 * Extrait les titres d'un Markdown.
 *
 * Utilisé par le sommaire (rendu React) et par la validation (scripts Node) —
 * même fonction des deux côtés, donc le sommaire ne peut pas diverger de ce
 * qui est réellement rendu.
 *
 * Les blocs de code sont ignorés : un « # » en début de ligne dans un extrait
 * shell n'est pas un titre.
 */
export function extractHeadings(markdown) {
  const headings = [];
  let inFence = false;

  for (const line of String(markdown).split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/\s*#+\s*$/, "").trim();
    headings.push({
      level: match[1].length,
      text,
      id: slugifyHeading(text),
    });
  }

  return headings;
}

/** Titres retenus pour le sommaire : H2 et H3 uniquement. */
export const tocHeadings = (markdown) =>
  extractHeadings(markdown).filter((h) => h.level === 2 || h.level === 3);
