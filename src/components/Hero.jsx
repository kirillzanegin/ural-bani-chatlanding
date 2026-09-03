export default function Hero() {
  const heroImage = `${import.meta.env.BASE_URL}project-exterior.webp`

  return (
    <section className="hero" id="top">
      <div className="container hero-content">
        <div className="hero-copy">
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

        <figure className="hero-media">
          <img
            src={heroImage}
            alt="Готовая баня с крытой террасой"
            fetchPriority="high"
          />
          <figcaption>Готовая баня с крытой террасой</figcaption>
        </figure>
      </div>
    </section>
  )
}
