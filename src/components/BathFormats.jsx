import { bathFormats } from '../data/bathFormats.js'

export default function BathFormats() {
  return (
    <section className="section" id="formats">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Форматы</p>
          <h2>Популярные форматы бань</h2>
          <p>Пока без реальных фото можно использовать аккуратные 3D-заглушки или визуализации.</p>
        </div>
        <div className="cards-grid">
          {bathFormats.map((item) => (
            <article className="card format-card" key={item.title}>
              <div className="image-placeholder">3D / фото</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.items.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <strong>{item.price}</strong>
              <a className="button button-primary" href="#quiz">Рассчитать такую баню</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
