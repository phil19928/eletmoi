/**
 * Schéma du frontmatter des articles.
 *
 * Node uniquement (scripts/content/*.mjs) : zod ne doit jamais atteindre le
 * bundle client. Les métadonnées consommées par React passent par le manifeste
 * généré, déjà validé au build.
 */

import { z } from "zod";
import { LIMITS } from "./seo.config.mjs";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date attendue au format AAAA-MM-JJ");

const slugPattern = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "slug : minuscules non accentuées, chiffres et tirets uniquement"
  );

export const CLUSTERS = ["A", "B", "C", "D", "E", "F"];
export const TEMPLATES = ["article", "guide", "comparison", "legal", "brand"];
export const STATUSES = ["planned", "draft", "review", "published"];

export const internalLinkSchema = z.object({
  id: z.string().regex(/^[A-F]\d+$/, "id d'article attendu, ex. C3"),
  anchor: z
    .string()
    .min(3)
    .refine(
      (a) => !/^(cliquez ici|ici|lire la suite|en savoir plus)$/i.test(a.trim()),
      "ancre non descriptive : décrivez la page cible"
    ),
  context: z.enum(["body", "cta", "related"]).default("body"),
});

export const externalSourceSchema = z.object({
  title: z.string().min(3),
  publisher: z.string().min(2),
  url: z.string().url(),
  accessedOn: isoDate,
  // Calculé automatiquement si absent (voir links.mjs → qualifyRel).
  rel: z.string().optional(),
});

export const articleSchema = z
  .object({
    // Identité
    id: z.string().regex(/^[A-F]\d+$/),
    slug: slugPattern,
    cluster: z.enum(CLUSTERS),
    route: z.string().startsWith("/"),
    status: z.enum(STATUSES),
    template: z.enum(TEMPLATES),

    // SEO
    metaTitle: z.string().max(
      LIMITS.metaTitleMax,
      `metaTitle : ${LIMITS.metaTitleMax} caractères maximum`
    ),
    metaDescription: z
      .string()
      .min(
        LIMITS.metaDescriptionMin,
        `metaDescription : ${LIMITS.metaDescriptionMin} caractères minimum`
      )
      .max(
        LIMITS.metaDescriptionMax,
        `metaDescription : ${LIMITS.metaDescriptionMax} caractères maximum`
      ),
    h1: z.string().min(10),
    keywordPrimary: z.string().min(2),
    keywordsSecondary: z.array(z.string()).default([]),
    searchIntent: z.enum(["informational", "commercial", "transactional"]),
    canonical: z.string().url(),
    noindex: z.boolean().default(false),

    // Dates — obligatoires, affichées à l'écran et dans le JSON-LD
    datePublished: isoDate,
    dateModified: isoDate,
    // Date de vérification des faits cités (tarifs, fonctionnalités
    // concurrentes). Distincte de `dateModified` : retoucher la structure d'un
    // comparatif ne revérifie pas les tarifs qu'il annonce, et le bandeau de
    // transparence ne doit pas le laisser croire. À défaut, il retombe sur
    // `dateModified`.
    factsVerifiedOn: isoDate.optional(),
    reviewCycle: z
      .enum(["monthly", "quarterly", "biannual", "annual"])
      .default("quarterly"),

    // Auteur — obligatoire (E-E-A-T)
    author: z.string().min(2),
    reviewedBy: z.string().optional(),

    // Maillage
    internalLinks: z
      .array(internalLinkSchema)
      .min(
        LIMITS.minInternalLinks,
        `internalLinks : ${LIMITS.minInternalLinks} entrées minimum`
      ),
    // Le minimum est vérifié dans superRefine : une page produit n'a pas à
    // citer de sources, et l'imposer avait fait apparaître un lien vers la
    // documentation Apple au milieu d'une page destinée à des parents.
    externalSources: z.array(externalSourceSchema).default([]),

    // Blocs optionnels
    faq: z.array(z.object({ q: z.string().min(5), a: z.string().min(10) })).default([]),
    comparisonTable: z
      .object({
        competitors: z.array(z.string()).min(1),
        pillars: z.array(z.string()).min(2),
        rows: z
          .array(
            z.object({
              pillar: z.string(),
              eletmoi: z.string(),
              others: z.record(z.string(), z.string()).default({}),
            })
          )
          .default([]),
      })
      .optional(),
    howToSteps: z
      .array(
        z.object({
          name: z.string().min(3),
          text: z.string().min(10),
          image: z.string().optional(),
        })
      )
      .default([]),
    cta: z
      .object({
        label: z.string().min(3),
        target: z.enum(["stores", "app", "route"]).default("stores"),
        route: z.string().optional(),
        utm: z.string().min(3),
      })
      .optional(),

    // Médias
    ogImage: z.string().startsWith("/"),
    imageAlt: z.string().min(10),
  })
  .superRefine((data, ctx) => {
    const issue = (message, path) =>
      ctx.addIssue({ code: "custom", message, path: path ? [path] : [] });

    if (
      data.template !== "brand" &&
      data.externalSources.length < LIMITS.minExternalSources
    ) {
      issue(
        `externalSources : ${LIMITS.minExternalSources} entrées minimum ` +
          `(non requis pour le template « brand »)`,
        "externalSources"
      );
    }

    if (data.dateModified < data.datePublished) {
      issue("dateModified antérieure à datePublished", "dateModified");
    }

    if (!data.route.endsWith(`/${data.slug}`) && data.route !== `/${data.slug}`) {
      issue(`route « ${data.route} » incohérente avec le slug « ${data.slug} »`, "route");
    }

    // Le template comparison n'a de sens qu'avec un tableau à afficher.
    if (data.template === "comparison" && !data.comparisonTable) {
      issue("template « comparison » sans comparisonTable", "comparisonTable");
    }

    // Le template guide alimente le JSON-LD HowTo : sans étapes, il est vide.
    if (data.template === "guide" && data.howToSteps.length === 0) {
      issue("template « guide » sans howToSteps : le JSON-LD HowTo serait vide", "howToSteps");
    }
  });

export function validateArticle(frontmatter) {
  return articleSchema.safeParse(frontmatter);
}

/** Aplatit les erreurs zod en lignes lisibles pour le rapport CLI. */
export function formatIssues(error) {
  return error.issues.map((i) => {
    const where = i.path.length ? i.path.join(".") : "(racine)";
    return `${where} — ${i.message}`;
  });
}
