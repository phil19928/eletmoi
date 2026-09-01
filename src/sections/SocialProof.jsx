import Container from "../components/Container";
import SocialProofBar from "../components/SocialProofBar";
import ReviewsCarousel from "../components/ReviewsCarousel";

/**
 * Preuve sociale, entre le hero et Smartloop.
 *
 * Volontairement rendue par un <section> nu et **sans animation
 * d'apparition**, contrairement aux autres sections : tout
 * `initial={{ opacity: 0 }}` de framer-motion se sérialise en
 * `style="opacity:0"` dans le HTML prérendu. Les avis doivent être peints dès
 * le premier rendu, y compris sans JavaScript — c'est précisément ce qu'on
 * demande à une preuve sociale.
 */
export default function SocialProof() {
  return (
    <section
      id="avis"
      className="relative bg-primary-very-light/50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-dark">
            Avis
          </span>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 text-balance sm:text-4xl lg:text-5xl">
            Ce que disent{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              les parents
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Avis publiés sur l'App Store et Google Play.
          </p>
        </div>

        <SocialProofBar />

        <div className="mt-12">
          <ReviewsCarousel />
        </div>
      </Container>
    </section>
  );
}
