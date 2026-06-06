import { useTranslation } from 'react-i18next'
import { useProfile } from './i18n/useProfile'
import Particles from './components/Particles'
import Header from './components/Header'
import Bio from './components/Bio'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Languages from './components/Languages'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import SocialLinks from './components/SocialLinks'
import LanguageToggle from './components/LanguageToggle'
import './App.css'

function App() {
  const { t } = useTranslation()
  const p = useProfile()

  return (
    <div className="app">
      <Particles />
      <LanguageToggle />
      <main className="container">
        <Header />
        <Bio />
        <Experience />
        <Education />
        {p.skills && <Skills />}
        <Languages />
        <Certifications />
        <Projects />
        <SocialLinks />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {p.name}. {t('footer')}</p>
      </footer>
    </div>
  )
}

export default App
