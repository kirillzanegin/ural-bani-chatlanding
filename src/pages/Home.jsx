import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import ChatQuiz from '../components/ChatQuiz.jsx'
import BathFormats from '../components/BathFormats.jsx'
import Included from '../components/Included.jsx'
import RealProjects from '../components/RealProjects.jsx'
import WorkSteps from '../components/WorkSteps.jsx'
import KnowledgeBase from '../components/KnowledgeBase.jsx'
import FAQ from '../components/FAQ.jsx'
import FeedbackForm from '../components/FeedbackForm.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RealProjects />
        <BathFormats />
        <ChatQuiz />
        <Included />
        <WorkSteps />
        <KnowledgeBase />
        <FAQ />
        <FeedbackForm />
      </main>
      <Footer />
    </>
  )
}
