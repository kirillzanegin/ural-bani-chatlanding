import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { getLandingEnhancement } from '../data/landingEnhancements.js'

function makeId(title) {
  return title.toLowerCase().replaceAll(' ', '-')
}

function SectionLinks({ links }) {
  if (!links?.length) return null

  return (
    <div className="article-card-grid">
      {links.map((link) => (
        <a className="article-info-card" href={link.href} key={link.href}>
          <h3>{link.label}</h3>
          <p>Открыть связанный материал</p>
        </a>
      ))}
    </div>
  )
}

function LandingFaq({ items }) {
  if (!items?.length) return null

  return (
    <section className="article-section">
      <h2>Частые вопросы</h2>
      <div className="faq-list">
        {items.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default function SeoLandingPage({ landing }) {
  const enhancement = getLandingEnhancement(landing.path)
  const sections = [...landing.sections, ...enhancement.sections]

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
              {sections.map((section) => {
                const sectionId = makeId(section.title)

                return (
                  <button className="article-toc-link" type="button" key={section.title} onClick={() => scrollToSection(sectionId)}>
                    {section.title}
                  </button>
                )
              })}
              {enhancement.faq?.length > 0 && (
                <button className="article-toc-link" type="button" onClick={() => scrollToSection('faq')}>Частые вопросы</button>
              )}
              <a href="/#feedback">Рассчитать стоимость</a>
            </aside>

            <div className="article-content">
              {sections.map((section) => (
                <section className="article-section" id={makeId(section.title)} key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.list && (
                    <ul className="article-checklist">
                      {section.list.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  <SectionLinks links={section.links} />
                </section>
              ))}

              <section id="faq">
                <LandingFaq items={enhancement.faq} />
              </section>

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
