import { knowledgeItems } from '../data/knowledge.js'

export default function KnowledgeBase() {
  return (
    <section className="section" id="knowledge">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Полезные материалы</p>
          <h2>База знаний</h2>
        </div>
        <div className="knowledge-grid">
          {knowledgeItems.map((item) => (
            item.isReady ? (
              <a className="knowledge-card knowledge-card-link" href={'/articles/' + item.slug + '/'} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="text-link">Читать статью</span>
              </a>
            ) : (
              <article className="knowledge-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="article-soon">Скоро</span>
              </article>
            )
          ))}
        </div>
      </div>
    </section>
  )
}
