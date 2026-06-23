import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Thanks from './pages/Thanks.jsx'
import LegalPage from './pages/LegalPage.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import './quiz-legal.css'
import './article.css'

export default function App() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    window.setTimeout(() => {
      if (hash.startsWith('#article/')) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }

      if (['#thanks', '#privacy', '#personal-data-consent', '#cookies'].includes(hash)) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }

      const id = hash.replace('#', '')
      const target = id ? document.getElementById(id) : null

      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' })
      }
    }, 0)
  }, [hash])

  if (hash === '#thanks') return <Thanks />
  if (hash === '#privacy') return <LegalPage type="privacy" />
  if (hash === '#personal-data-consent') return <LegalPage type="personal-data-consent" />
  if (hash === '#cookies') return <LegalPage type="cookies" />
  if (hash.startsWith('#article/')) return <ArticlePage slug={hash.replace('#article/', '')} />

  return <Home />
}
