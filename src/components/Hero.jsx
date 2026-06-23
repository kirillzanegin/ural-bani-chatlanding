export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <div className="video-placeholder">Здесь будет видеофон: современная баня, тёплый свет, участок, снег или лес</div>
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="eyebrow">Полноценное банное здание под ключ</p>
        <h1>Бани под ключ от 15 м²</h1>
        <p className="hero-subtitle">
          Парная, помывочная, комната отдыха, инженерия и готовность к использованию. Строим по всему Уралу.
        </p>
        <div className="hero-facts">
          <span>не готовый модуль</span>
          <span>монтаж от 3 недель</span>
          <span>гарантия 3 года</span>
          <span>индивидуальная планировка</span>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#quiz">Рассчитать стоимость</a>
          <a className="button button-ghost" href="#layouts">Посмотреть планировки</a>
        </div>
      </div>
    </section>
  )
}
