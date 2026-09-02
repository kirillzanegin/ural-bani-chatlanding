export default function Hero() {
  const heroImage = `${import.meta.env.BASE_URL}project-exterior.webp`

  return (
    <section className="hero" id="top">
      <img
        className="hero-background"
        src={heroImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <p className="eyebrow">Бани Урала</p>
        <h1>
          <span>Строим бани</span>
          <span>под ключ</span>
        </h1>
        <p className="hero-subtitle">
          Проектируем под ваш участок, строим и комплектуем - от парной и помывочной до инженерии, отделки и мебели.
        </p>
        <p className="hero-region">
          Работаем в Свердловской, Челябинской, Тюменской и Курганской областях.
        </p>
        <div className="hero-facts" aria-label="Основные условия">
          <span>от 15 м²</span>
          <span>монтаж от 3 недель</span>
          <span>гарантия 3 года</span>
          <span>индивидуальная планировка</span>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#quiz">Получить предварительный расчёт</a>
          <a className="button button-ghost button-ghost-light" href="#project">Посмотреть готовую баню</a>
        </div>
      </div>
    </section>
  )
}
