/**
 * Retire le bloc de frontmatter d'un Markdown brut.
 *
 * Le manifeste généré porte déjà les métadonnées, validées au build : le
 * navigateur n'a donc aucune raison d'embarquer un parseur YAML. Une simple
 * découpe suffit.
 */
export function stripFrontmatter(raw) {
  return String(raw).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}
