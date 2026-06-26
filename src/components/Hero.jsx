export default function Hero() {
  const heroBackground = `${import.meta.env.BASE_URL}hero-bath-bg.webp`

  return (
    <section className="hero" id="top">
      <div
        className="hero-media"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="eyebrow">Строим качественные бани под ключ</p>
        <h1>О какой бане вы мечтаете?</h1>
        <p className="hero-subtitle">
          Берем на себя заботы обо всех процессах от проектирования до установки мебели.
        </p>
        <p className="hero-subtitle hero-subtitle-secondary">
          Строим в Свердловской, Курганской, Тюменской и Челябинской областях.
        </p>
        <div className="hero-facts">
          <span>от 15 м²</span>
          <span>индивидуальные решения</span>
          <span>монтаж от 3 недель</span>
          <span>гарантия 3 года</span>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#feedback">Рассчитать стоимость</a>
          <a className="button button-ghost" href="#layouts">Посмотреть планировки</a>
        </div>
      </div>
    </section>
  )
}
