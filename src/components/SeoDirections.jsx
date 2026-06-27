import { seoLandings } from '../data/seoLandings.js'

export default function SeoDirections() {
  return (
    <section className="section section-warm" id="directions">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Направления</p>
          <h2>Бани под разные задачи</h2>
          <p>Отдельные страницы помогают быстрее выбрать подходящий формат: по городу, площади, планировке и дополнительным помещениям.</p>
        </div>
        <div className="knowledge-grid">
          {seoLandings.slice(0, 12).map((item) => (
            <a className="knowledge-card knowledge-card-link" href={item.path} key={item.path}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="text-link">Открыть</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
