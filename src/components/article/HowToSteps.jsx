import { slugifyHeading } from "../../lib/slugify";

/**
 * Étapes numérotées d'un guide.
 *
 * Alimente aussi le JSON-LD HowTo, injecté au prérendu depuis les mêmes
 * données du frontmatter : ce qui est affiché et ce qui est déclaré à Google
 * ne peuvent pas diverger.
 */
export default function HowToSteps({ steps = [], title = "Étape par étape" }) {
  if (steps.length === 0) return null;
  const titleId = slugifyHeading(title);

  return (
    <section aria-labelledby={titleId} className="my-12">
      <h2
        id={titleId}
        className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 scroll-mt-24"
      >
        {title}
      </h2>

      <ol className="space-y-5 list-none pl-0">
        {steps.map((step, index) => (
          <li
            key={step.name}
            className="relative rounded-2xl border border-slate-200 bg-white p-5 pl-16"
          >
            <span
              aria-hidden="true"
              className="absolute left-5 top-5 w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center"
            >
              {index + 1}
            </span>

            <h3 className="text-base font-semibold text-slate-900 mt-0 mb-1">
              <span className="sr-only">Étape {index + 1} : </span>
              {step.name}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-0">{step.text}</p>

            {step.image ? (
              <img
                src={step.image}
                alt={`Illustration de l'étape ${index + 1} : ${step.name}`}
                loading="lazy"
                decoding="async"
                className="mt-4 w-full rounded-xl border border-slate-200"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
