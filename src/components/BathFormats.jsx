import { bathFormats } from '../data/bathFormats.js'

export default function BathFormats() {
  return (
    <section className="section" id="formats">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Отправная точка</p>
          <h2>Выберите подходящую площадь</h2>
          <p>Планировку и состав помещений адаптируем под участок, привычки семьи и выбранную комплектацию.</p>
        </div>
        <div className="format-grid">
          {bathFormats.map((item) => (
            <article className="card format-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.items.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <strong className="format-price">{item.price}</strong>
              <a className="text-link" href="#quiz">Рассчитать такую баню</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
