import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import ChatQuiz from '../components/ChatQuiz.jsx'
import BathFormats from '../components/BathFormats.jsx'
import Included from '../components/Included.jsx'
import RealProjects from '../components/RealProjects.jsx'
import Layouts from '../components/Layouts.jsx'
import WorkSteps from '../components/WorkSteps.jsx'
import KnowledgeBase from '../components/KnowledgeBase.jsx'
import Reviews from '../components/Reviews.jsx'
import FAQ from '../components/FAQ.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import FeedbackForm from '../components/FeedbackForm.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ChatQuiz />
        <BathFormats />
        <Included />
        <RealProjects />
        <Layouts />
        <WorkSteps />
        <KnowledgeBase />
        <Reviews />
        <FAQ />
        <FinalCTA />
        <FeedbackForm />
      </main>
      <Footer />
    </>
  )
}
