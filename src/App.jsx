import { profile } from './data/profile'
import Header from './components/Header'
import Bio from './components/Bio'
import Projects from './components/Projects'
import SocialLinks from './components/SocialLinks'
import './App.css'

function App() {
  return (
    <div className="app">
      <main className="container">
        <Header />
        <Bio />
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
