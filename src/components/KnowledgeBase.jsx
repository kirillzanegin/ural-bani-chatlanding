import { knowledgeItems } from '../data/knowledge.js'

export default function KnowledgeBase() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Полезные материалы</p>
          <h2>База знаний</h2>
          <p>Заготовка раздела со статьями, которые будут помогать пользователю разобраться в выборе бани.</p>
        </div>
        <div className="knowledge-grid">
          {knowledgeItems.map((item) => (
            <article className="knowledge-card" key={item}>
              <h3>{item}</h3>
              <p>Здесь будет статья с простыми объяснениями, примерами и ссылкой на расчёт.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
