import { useEffect, useRef, useState } from 'react'
import Home from './pages/Home.jsx'
import Thanks from './pages/Thanks.jsx'
import LegalPage from './pages/LegalPage.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import SeoLandingPage from './pages/SeoLandingPage.jsx'
import { getSeoLandingByPath } from './data/seoLandings.js'
import { reachGoal, trackPageView } from './utils/metrika.js'
import './quiz-legal.css'
import './article.css'
import './article-fixes.css'

function getRoute() {
  return {
    hash: window.location.hash,
    pathname: window.location.pathname,
  }
}

function getArticleSlug(pathname) {
  const match = pathname.match(/^\/articles\/([^/]+)\/?$/)
  return match ? match[1] : ''
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  const isFirstPageView = useRef(true)
  const articleSlug = getArticleSlug(route.pathname)
  const landing = getSeoLandingByPath(route.pathname)
  const hash = route.hash

  useEffect(() => {
    const handleRouteChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleRouteChange)
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('hashchange', handleRouteChange)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    const handleTrackedClick = (event) => {
      const link = event.target.closest('a')
      if (!link) return

      const href = link.getAttribute('href') || ''
      if (/(^|\/)#(quiz|feedback)$/.test(href)) {
        reachGoal('click_calculate')
      }

      if (/(^|\/)#layouts$/.test(href)) {
        reachGoal('click_layouts')
      }

      if (href.startsWith('tel:')) {
        reachGoal('click_phone')
      }
    }

    document.addEventListener('click', handleTrackedClick)
    return () => document.removeEventListener('click', handleTrackedClick)
  }, [])

  useEffect(() => {
    if (isFirstPageView.current) {
      isFirstPageView.current = false
      return
    }

    trackPageView(window.location.href)
  }, [route.pathname, route.hash])

  useEffect(() => {
    window.setTimeout(() => {
      if (articleSlug || landing || hash.startsWith('#article/')) {
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
  }, [hash, articleSlug, landing])

  if (hash === '#thanks') return <Thanks />
  if (hash === '#privacy') return <LegalPage type="privacy" />
  if (hash === '#personal-data-consent') return <LegalPage type="personal-data-consent" />
  if (hash === '#cookies') return <LegalPage type="cookies" />
  if (articleSlug) return <ArticlePage slug={articleSlug} />
  if (landing) return <SeoLandingPage landing={landing} />
  if (hash.startsWith('#article/')) return <ArticlePage slug={hash.replace('#article/', '')} />

  return <Home />
}
