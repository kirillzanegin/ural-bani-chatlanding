export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <strong>Бани Урала</strong>
          <span>Строим бани под ключ на Урале</span>
          <span>Свердловская, Челябинская, Тюменская и Курганская области</span>
        </div>

        <nav className="footer-links" aria-label="База знаний">
          <strong>База знаний</strong>
          <a href="/articles/kak-vybrat-banyu-dlya-zagorodnogo-uchastka/">Как выбрать баню для участка</a>
          <a href="/articles/chto-vhodit-v-banyu-pod-klyuch/">Что входит в баню под ключ</a>
          <a href="/articles/kak-podgotovit-uchastok-k-stroitelstvu-bani/">Как подготовить участок</a>
        </nav>

        <nav className="footer-links" aria-label="Документы сайта">
          <strong>Документы</strong>
          <a href="#privacy">Политика обработки персональных данных</a>
          <a href="#personal-data-consent">Согласие на обработку персональных данных</a>
          <a href="#cookies">Политика использования cookies</a>
        </nav>
      </div>

      <details className="container footer-useful">
        <summary>Полезные ссылки</summary>
        <div className="footer-useful-grid">
          <nav className="footer-links" aria-label="Популярные направления">
            <strong>По регионам</strong>
            <a href="/bani-pod-klyuch/">Бани под ключ</a>
            <a href="/bani-pod-klyuch-ekaterinburg/">Бани в Екатеринбурге</a>
            <a href="/bani-pod-klyuch-sverdlovskaya-oblast/">Бани в Свердловской области</a>
            <a href="/bani-pod-klyuch-chelyabinsk/">Бани в Челябинске</a>
            <a href="/bani-pod-klyuch-tyumen/">Бани в Тюмени</a>
          </nav>

          <nav className="footer-links" aria-label="Площади и форматы бань">
            <strong>Площади и форматы</strong>
            <a href="/banya-15-m2/">Баня 15 м²</a>
            <a href="/banya-20-m2/">Баня 20 м²</a>
            <a href="/banya-30-m2/">Баня 30 м²</a>
            <a href="/banya-40-m2/">Баня 40 м²</a>
            <a href="/banya-s-terrasoy/">Баня с террасой</a>
            <a href="/banya-s-sanuzlom/">Баня с санузлом</a>
          </nav>
        </div>
      </details>
    </footer>
  )
}
