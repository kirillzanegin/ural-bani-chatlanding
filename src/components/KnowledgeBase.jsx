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
            <article className="knowledge-card" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
