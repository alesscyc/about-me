import { profile } from './data/profile'
import Header from './components/Header'
import Bio from './components/Bio'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import SocialLinks from './components/SocialLinks'
import './App.css'

function App() {
  return (
    <div className="app">
      <main className="container">
        <Header />
        <Bio />
        <Experience />
        <Education />
        {profile.skills && <Skills />}
        <Projects />
        <SocialLinks />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {profile.name}. Built with Vite &amp; React.</p>
      </footer>
    </div>
  )
}

export default App
