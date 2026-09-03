import { motion } from "framer-motion";
import Container from "../components/Container";
import Button from "../components/Button";
import PhoneMockup from "../components/PhoneMockup";
import { APP_STORE_URL, PARENT_APP_URL, PLAY_STORE_URL } from "../config";
import screenDashboard from "../assets/parentdashboard.png";
import screenEnfant from "../assets/enfantdashboard.png";
import badgeAppStore from "../assets/Newapplelogo.png";
import badgePlayStore from "../assets/Newgooglelogo.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-primary-very-light/30 to-white pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-16 lg:pb-0">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(122,158,136,0.12) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(169,196,182,0.12) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spinning decorative ring */}
      <div className="absolute top-[15%] right-[8%] w-72 h-72 rounded-full border border-primary/[0.06] animate-spin-slow pointer-events-none hidden lg:block" />
      <div
        className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full border border-primary/[0.04] animate-spin-slow pointer-events-none hidden lg:block"
        style={{ animationDirection: "reverse" }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="animate-enter text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
              L'application de contrôle parental
              <br className="hidden sm:block" />{" "}
              qui transforme{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary-dark animated-gradient">
                le temps d'écran
              </span>
            </h1>

            <p
              style={{ animationDelay: "80ms" }}
              className="animate-enter mt-6 text-lg sm:text-xl text-slate-500 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              Votre enfant apprend 10 min — il gagne 20 min d'écran.
              Un échange transparent que toute la famille comprend et accepte.
            </p>

            {/*
              Deux parcours, empilés — pas côte à côte.

              Le parent ouvre une page web, l'enfant installe une application :
              deux gestes, deux personnes. Ils méritent d'être séparés, mais la
              colonne de texte du hero ne fait que 504 px sur desktop : deux
              colonnes y comprimaient les badges à 130 px de large au lieu de
              191 (`max-width: 100%` de Tailwind écrase alors l'image à hauteur
              fixe). D'où l'empilement, avec un séparateur étiqueté.

              `shrink-0` sur les deux liens : sans lui, un badge redevient
              déformable dès que la place manque, sans rien signaler.
            */}
            <div
              style={{ animationDelay: "160ms" }}
              className="animate-enter mt-10 flex flex-col items-center gap-6 lg:items-start"
            >
              {/* Parcours parent */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse-ring pointer-events-none" />
                  <Button
                    href={PARENT_APP_URL}
                    variant="card"
                    className="relative z-10 !px-8 !py-4 !rounded-2xl !gap-4 whitespace-nowrap"
                  >
                    <span className="w-9 h-9 rounded-xl bg-primary-very-light flex items-center justify-center flex-shrink-0 text-primary">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                      </svg>
                    </span>
                    <span className="text-lg font-normal tracking-tight text-slate-900">
                      Accès Parent
                    </span>
                  </Button>
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  Gratuit, dans votre navigateur — rien à installer.
                </p>
              </div>

              {/*
                Parcours enfant, dans un encadré.

                Le bouton parent est une carte (variant `card`) : l'encadrer de
                la même façon fait des deux parcours deux objets de même nature,
                posés l'un sous l'autre, au lieu d'une étiquette flottante.

                Largeurs vérifiées : encadré = badges + 32 px de rembourrage,
                soit 426 px au-delà de sm (2 × 191 + 12 + 32) — la colonne de
                texte la plus étroite du hero fait 440 px à 1024 px de large.
                En mobile, h-10 : à h-11 les 312 px de badges plus le
                rembourrage dépassaient les 320 px utiles d'un écran de 360.
              */}
              <div className="w-full rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm sm:w-auto">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Application enfant
                </p>

                <div className="flex items-center justify-center gap-3 sm:justify-start">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <img
                      src={badgeAppStore}
                      alt="Télécharger l'application enfant El&Moi sur iPhone (App Store)"
                      width="191"
                      height="56"
                      className="h-10 w-auto transition-opacity duration-200 hover:opacity-80 sm:h-14"
                    />
                  </a>
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <img
                      src={badgePlayStore}
                      alt="Télécharger l'application enfant El&Moi sur Android (Google Play)"
                      width="191"
                      height="56"
                      className="h-10 w-auto transition-opacity duration-200 hover:opacity-80 sm:h-14"
                    />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right — Two Phone Mockups */}
          <div className="relative flex items-start justify-center gap-3 sm:gap-5 lg:gap-6 order-1 lg:order-2 py-6 lg:py-10">

            {/* Background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[32rem] sm:h-[32rem] bg-gradient-to-br from-primary-very-light via-secondary-very-light/60 to-cyan-100/30 rounded-full blur-3xl -z-0 pointer-events-none" />

            {/* Accès Parent */}
            <div
              style={{ animationDelay: "120ms" }}
              className="animate-enter flex flex-col items-center gap-2 sm:gap-3 relative z-10"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-[10px] sm:text-xs font-semibold border border-primary/20 shadow-sm whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Accès Parent
              </span>
              <div className="w-[130px] sm:w-[155px] md:w-[175px] lg:w-[200px] xl:w-[225px]">
                <PhoneMockup
                  image={screenDashboard}
                  alt="Accès Parent El&Moi : suivi du temps d'écran par application"
                  priority
                />
              </div>
            </div>

            {/* Application enfant — décalée vers le bas */}
            <div
              style={{ animationDelay: "200ms" }}
              className="animate-enter flex flex-col items-center gap-2 sm:gap-3 mt-10 sm:mt-14 lg:mt-16 relative z-10"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary-dark text-[10px] sm:text-xs font-semibold border border-secondary/20 shadow-sm whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Application enfant
              </span>
              <div className="w-[130px] sm:w-[155px] md:w-[175px] lg:w-[200px] xl:w-[225px]">
                <PhoneMockup
                  image={screenEnfant}
                  alt="Application enfant El&Moi : compteur de temps d'écran gagné en apprenant"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </Container>

    </section>
  );
}
