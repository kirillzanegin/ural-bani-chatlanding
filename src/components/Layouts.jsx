const layouts = ['15 м²', '20 м²', '30 м²', '40 м²', '60 м²']

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
            <article className="layout-card" key={layout}>
              <div className="scheme-placeholder">{layout}</div>
              <h3>Планировка {layout}</h3>
              <p>Здесь будет схема сверху, состав помещений и пояснение, кому подходит этот формат.</p>
              <a className="button button-ghost" href="#quiz">Рассчитать по этой планировке</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
