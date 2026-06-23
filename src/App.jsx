import Home from './pages/Home.jsx'
import Thanks from './pages/Thanks.jsx'

export default function App() {
  const isThanks = window.location.hash === '#thanks'

  return isThanks ? <Thanks /> : <Home />
}
