import Hero from './components/Hero'
import ScreenSection from './components/ScreenSection'
import FAQ from './components/FAQ'
import FooterCTA from './components/FooterCTA'
import Footer from './components/Footer'
import simpleJusteImg from './assets/simpleJuste.png'
import echangeEquitableImg from './assets/échange équitable.png'
import missionsReellesImg from './assets/missions réelles.png'
import cadreIntelligentImg from './assets/cadre intelligent.png'

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display antialiased min-h-screen">
      <main>
        <Hero />
        <ScreenSection
          id="simple"
          title="simple. juste."
          text="Deux applis : une pour le parent, une pour l'enfant. Vous posez le cadre, il garde l'autonomie."
          image={simpleJusteImg}
          altBg
        />
        <ScreenSection
          id="echange"
          title="échange équitable"
          text="1 minute d'apprentissage = X minutes de divertissement. Le temps se gagne, puis se dépense quand l'enfant veut."
          image={echangeEquitableImg}
        />
        <ScreenSection
          id="missions"
          title="missions réelles"
          text="Le parent crée des missions (lit, devoirs…). L'enfant envoie une photo, le parent valide, et du temps bonus est ajouté."
          image={missionsReellesImg}
          altBg
        />
        <ScreenSection
          id="cadre"
          title="cadre intelligent"
          text="Plages horaires (école, nuit) : le divertissement peut être bloqué automatiquement."
          image={cadreIntelligentImg}
        />
        <FAQ />
        <FooterCTA />
        <Footer />
      </main>
    </div>
  )
}

export default App
