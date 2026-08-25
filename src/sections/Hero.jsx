import { motion } from "framer-motion";
import Container from "../components/Container";
import Button from "../components/Button";
import PhoneMockup from "../components/PhoneMockup";
import { APP_STORE_URL, PLAY_STORE_URL } from "../config";
import screenDashboard from "../assets/parentdashboard.png";
import screenEnfant from "../assets/enfantdashboard.png";
import badgeAppStore from "../assets/badge--app-store.png";
import badgePlayStore from "../assets/Google_Play_Store_badge_FR.svg.png";

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
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold tracking-tight text-slate-900 leading-[1.12] text-balance"
            >
              L'application de contrôle parental
              <br className="hidden sm:block" />{" "}
              qui transforme{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary-dark animated-gradient">
                le temps d'écran
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-slate-500 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              Votre enfant apprend 10 min — il gagne 20 min d'écran.
              Un échange transparent que toute la famille comprend et accepte.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse-ring pointer-events-none" />
                <Button
                  href="https://eletmoi.app"
                  variant="card"
                  className="relative z-10 !px-8 !py-4 !rounded-2xl !gap-4"
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
                    Commencer gratuitement
                  </span>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-8 inline-block"
            >
              <div className="flex items-center gap-3">
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                  <img
                    src={badgeAppStore}
                    alt="Télécharger l'application de contrôle parental El&Moi sur iPhone iOS"
                    width="109"
                    height="36"
                    className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
                  />
                </a>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                  <img
                    src={badgePlayStore}
                    alt="Télécharger l'application de limitation de temps d'écran El&Moi sur Android"
                    width="122"
                    height="36"
                    className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
                  />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Right — Two Phone Mockups */}
          <div className="relative flex items-start justify-center gap-3 sm:gap-5 lg:gap-6 order-1 lg:order-2 py-6 lg:py-10">

            {/* Background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[32rem] sm:h-[32rem] bg-gradient-to-br from-primary-very-light via-secondary-very-light/60 to-cyan-100/30 rounded-full blur-3xl -z-0 pointer-events-none" />

            {/* App Parent */}
            <motion.div
              className="flex flex-col items-center gap-2 sm:gap-3 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-[10px] sm:text-xs font-semibold border border-primary/20 shadow-sm whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                App Parent
              </span>
              <div className="w-[130px] sm:w-[155px] md:w-[175px] lg:w-[200px] xl:w-[225px]">
                <PhoneMockup
                  image={screenDashboard}
                  alt="Tableau de bord parent El&Moi : suivi du temps d'écran par application"
                  priority
                />
              </div>
            </motion.div>

            {/* App Enfant — décalé vers le bas */}
            <motion.div
              className="flex flex-col items-center gap-2 sm:gap-3 mt-10 sm:mt-14 lg:mt-16 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary-dark text-[10px] sm:text-xs font-semibold border border-secondary/20 shadow-sm whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                App Enfant
              </span>
              <div className="w-[130px] sm:w-[155px] md:w-[175px] lg:w-[200px] xl:w-[225px]">
                <PhoneMockup
                  image={screenEnfant}
                  alt="App enfant El&Moi : compteur de temps d'écran gagné en apprenant"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </div>
      </Container>

    </section>
  );
}
