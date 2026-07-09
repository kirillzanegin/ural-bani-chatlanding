const layouts = [
  {
    area: '15 м²',
    title: 'Планировка 15 м²',
    image: '/layout-banya-15m2.svg',
    description: 'Компактная баня 5×3 м без террасы: парная 4 м², помывочная 4 м² и комната отдыха 7 м². Террасу можно добавить отдельно к проекту.',
    features: ['Парная', 'Помывочная', 'Комната отдыха', 'Шкаф для вещей'],
  },
  {
    area: '20 м²',
    title: 'Планировка 20 м²',
    description: 'Здесь появится схема сверху, состав помещений и пояснение, кому подходит этот формат.',
  },
  {
    area: '30 м²',
    title: 'Планировка 30 м²',
    description: 'Здесь появится схема сверху, состав помещений и пояснение, кому подходит этот формат.',
  },
  {
    area: '40 м²',
    title: 'Планировка 40 м²',
    description: 'Здесь появится схема сверху, состав помещений и пояснение, кому подходит этот формат.',
  },
  {
    area: '60 м²',
    title: 'Планировка 60 м²',
    description: 'Здесь появится схема сверху, состав помещений и пояснение, кому подходит этот формат.',
  },
]

export default function Layouts() {
  return (
    <section className="section section-warm" id="layouts">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Планировки</p>
          <h2>Планировки</h2>
          <p>Типовые планировки можно адаптировать под участок, количество гостей, формат отдыха и нужную комплектацию.</p>
        </div>
        <div className="layout-grid">
          {layouts.map((layout) => (
            <article className={layout.image ? 'layout-card layout-card-featured' : 'layout-card'} key={layout.area}>
              {layout.image ? (
                <div className="layout-plan-wrap">
                  <img className="layout-plan-image" src={layout.image} alt="Планировка бани 15 м²: парная, помывочная и комната отдыха" loading="lazy" />
                </div>
              ) : (
                <div className="scheme-placeholder">{layout.area}</div>
              )}

              <div className="layout-card-content">
                <h3>{layout.title}</h3>
                <p>{layout.description}</p>
                {layout.features && (
                  <ul>
                    {layout.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                )}
                <a className="button button-ghost" href="#feedback">Рассчитать по этой планировке</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
