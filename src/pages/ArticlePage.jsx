import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { articles, getArticleBySlug } from '../data/articles.js'
import { knowledgeItems } from '../data/knowledge.js'

function ArticleCards({ cards }) {
  if (!cards) return null

  return (
    <div className="article-card-grid">
      {cards.map((card) => (
        <div className="article-info-card" key={card.title}>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </div>
      ))}
    </div>
  )
}

function ArticleTable({ rows }) {
  if (!rows) return null

  return (
    <div className="article-table">
      {rows.map(([area, role, details]) => (
        <div className="article-table-row" key={area}>
          <strong>{area}</strong>
          <span>{role}</span>
          <p>{details}</p>
        </div>
      ))}
    </div>
  )
}

function ArticleScheme({ items }) {
  if (!items) return null

  return (
    <div className="article-scheme" aria-label="Логика движения по бане">
      {items.map((item, index) => (
        <div className="article-scheme-item" key={item}>
          <span>{index + 1}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  )
}

function ArticleChecklist({ items }) {
  if (!items) return null

  return (
    <ul className="article-checklist">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

export default function ArticlePage({ slug }) {
  const article = getArticleBySlug(slug) || articles[0]
  const currentIndex = knowledgeItems.findIndex((item) => item.slug === article.slug)
  const previousItem = currentIndex > 0 ? knowledgeItems[currentIndex - 1] : null
  const nextItem = currentIndex >= 0 && currentIndex < knowledgeItems.length - 1 ? knowledgeItems[currentIndex + 1] : null

  return (
    <>
      <Header />
      <main className="article-page">
        <article>
          <section className="article-hero">
            <div className="container article-hero-inner">
              <div>
                <p className="eyebrow">{article.eyebrow}</p>
                <h1>{article.title}</h1>
                <p className="article-lead">{article.lead}</p>
                <div className="article-meta">
                  <span>{article.readingTime}</span>
                  <span>Практическая статья</span>
                </div>
              </div>
              <div className="article-summary-card">
                <h2>Коротко</h2>
                <p>Сначала выбираем сценарий использования, потом площадь и состав помещений. После этого проверяем участок, инженерию и только затем сравниваем стоимость.</p>
              </div>
            </div>
          </section>

          <section className="section article-content-section">
            <div className="container article-layout">
              <aside className="article-toc">
                <strong>В статье</strong>
                {article.sections.map((section) => (
                  <a href={'#' + section.id} key={section.id}>{section.title}</a>
                ))}
              </aside>

              <div className="article-content">
                {article.intro.map((paragraph) => <p className="article-large" key={paragraph}>{paragraph}</p>)}

                {article.sections.map((section) => (
                  <section className="article-section" id={section.id} key={section.id}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    <ArticleCards cards={section.cards} />
                    <ArticleTable rows={section.table} />
                    <ArticleScheme items={section.scheme} />
                    <ArticleChecklist items={section.checklist} />
                    {section.quote && <blockquote>{section.quote}</blockquote>}
                  </section>
                ))}

                <section className="article-final-checklist">
                  <p className="eyebrow">Чек-лист</p>
                  <h2>Что понять перед заказом проекта</h2>
                  <ArticleChecklist items={article.finalChecklist} />
                  <a className="button button-primary" href="#feedback">Обсудить баню с менеджером</a>
                </section>
              </div>
            </div>
          </section>

          <section className="section article-nav-section">
            <div className="container article-nav">
              <a className="article-nav-card" href="#knowledge">
                <span>Все материалы</span>
                <strong>Вернуться в базу знаний</strong>
              </a>
              {previousItem && (
                <a className="article-nav-card" href={previousItem.isReady ? '#article/' + previousItem.slug : '#knowledge'}>
                  <span>Предыдущая</span>
                  <strong>{previousItem.title}</strong>
                </a>
              )}
              {nextItem && (
                <a className="article-nav-card" href={nextItem.isReady ? '#article/' + nextItem.slug : '#knowledge'}>
                  <span>Следующая</span>
                  <strong>{nextItem.title}</strong>
                </a>
              )}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
