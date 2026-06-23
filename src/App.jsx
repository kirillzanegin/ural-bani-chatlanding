import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Thanks from './pages/Thanks.jsx'
import LegalPage from './pages/LegalPage.jsx'
import './quiz-legal.css'

export default function App() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (hash === '#thanks') return <Thanks />
  if (hash === '#privacy') return <LegalPage type="privacy" />
  if (hash === '#personal-data-consent') return <LegalPage type="personal-data-consent" />
  if (hash === '#cookies') return <LegalPage type="cookies" />

  return <Home />
}
