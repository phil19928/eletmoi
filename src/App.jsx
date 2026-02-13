import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScreenSection from './components/ScreenSection'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display antialiased min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ScreenSection
          id="simple"
          title="simple. juste."
          text="Deux applis : une pour le parent, une pour l'enfant. Vous posez le cadre, il garde l'autonomie."
          illustrationVariant="blob"
          altBg
        />
        <ScreenSection
          id="echange"
          title="échange équitable"
          text="1 minute d'apprentissage = X minutes de divertissement. Le temps se gagne, puis se dépense quand l'enfant veut."
          illustrationVariant="none"
        />
        <ScreenSection
          id="missions"
          title="missions réelles"
          text="Le parent crée des missions (lit, devoirs…). L'enfant envoie une photo, le parent valide, et du temps bonus est ajouté."
          illustrationVariant="elephant"
          altBg
        />
        <ScreenSection
          id="cadre"
          title="cadre intelligent"
          text="Plages horaires (école, nuit) : le divertissement peut être bloqué automatiquement."
          illustrationVariant="blob"
        />
        <FAQ />
        <Footer />
      </main>
    </div>
  )
}

export default App
