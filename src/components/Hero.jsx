export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <div className="video-placeholder">Здесь будет фоновая картинка: современная баня, участок, лес и спокойная зимняя атмосфера</div>
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="eyebrow">Строим качественные бани под ключ</p>
        <h1>Бани под ключ в Свердловской, Курганской, Тюменской и Челябинской областях.</h1>
        <p className="hero-subtitle">
          Берем на себя ответственность за все процессы от проектирования до установки мебели.
        </p>
        <p className="hero-subtitle hero-subtitle-secondary">
          Парная, помывочная, комната отдыха, инженерия и готовность к использованию.
        </p>
        <div className="hero-facts">
          <span>от 15 м²</span>
          <span>индивидуальные решения</span>
          <span>монтаж от 3 недель</span>
          <span>гарантия 3 года</span>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#quiz">Рассчитать стоимость</a>
          <a className="button button-ghost" href="#layouts">Посмотреть планировки</a>
        </div>
      </div>
    </section>
  )
}
