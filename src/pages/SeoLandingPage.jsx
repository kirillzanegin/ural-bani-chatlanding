import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function makeId(title) {
  return title.toLowerCase().replaceAll(' ', '-')
}

export default function SeoLandingPage({ landing }) {
  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId)
    if (target) {
      target.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      <main className="article-page">
        <section className="article-hero">
          <div className="container article-hero-inner">
            <div>
              <p className="eyebrow">{landing.eyebrow}</p>
              <h1>{landing.title}</h1>
              <p className="article-lead">{landing.lead}</p>
            </div>
            <div className="article-summary-card">
              <h2>Коротко</h2>
              <p>{landing.summary}</p>
            </div>
          </div>
        </section>

        <section className="section article-content-section">
          <div className="container article-layout">
            <aside className="article-toc">
              <strong>На странице</strong>
              {landing.sections.map((section) => {
                const sectionId = makeId(section.title)

                return (
                  <button className="article-toc-link" type="button" key={section.title} onClick={() => scrollToSection(sectionId)}>
                    {section.title}
                  </button>
                )
              })}
              <a href="/#feedback">Рассчитать стоимость</a>
            </aside>

            <div className="article-content">
              {landing.sections.map((section) => (
                <section className="article-section" id={makeId(section.title)} key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.list && (
                    <ul className="article-checklist">
                      {section.list.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </section>
              ))}

              <section className="article-final-checklist">
                <p className="eyebrow">Следующий шаг</p>
                <h2>Получить предварительный расчёт</h2>
                <a className="button button-primary" href="/#feedback">Рассчитать баню</a>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
