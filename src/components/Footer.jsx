export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner footer-sitemap">
        <div className="footer-brand">
          <strong>Бани Урала</strong>
          <span>Бани под ключ от 15 м²</span>
          <span>Строим в Свердловской, Курганской, Тюменской и Челябинской областях</span>
        </div>

        <nav className="footer-links" aria-label="Популярные направления">
          <strong>Направления</strong>
          <a href="/bani-pod-klyuch/">Бани под ключ</a>
          <a href="/bani-pod-klyuch-ekaterinburg/">Бани в Екатеринбурге</a>
          <a href="/bani-pod-klyuch-sverdlovskaya-oblast/">Бани в Свердловской области</a>
          <a href="/bani-pod-klyuch-chelyabinsk/">Бани в Челябинске</a>
          <a href="/bani-pod-klyuch-tyumen/">Бани в Тюмени</a>
        </nav>

        <nav className="footer-links" aria-label="Форматы бань">
          <strong>Площади и форматы</strong>
          <a href="/banya-15-m2/">Баня 15 м²</a>
          <a href="/banya-20-m2/">Баня 20 м²</a>
          <a href="/banya-30-m2/">Баня 30 м²</a>
          <a href="/banya-40-m2/">Баня 40 м²</a>
          <a href="/banya-s-terrasoy/">Баня с террасой</a>
          <a href="/banya-s-sanuzlom/">Баня с санузлом</a>
        </nav>

        <nav className="footer-links footer-legal" aria-label="Документы сайта">
          <strong>Документы</strong>
          <a href="/#knowledge">База знаний</a>
          <a href="#privacy">Политика обработки персональных данных</a>
          <a href="#personal-data-consent">Согласие на обработку персональных данных</a>
          <a href="#cookies">Политика использования cookies</a>
          <a href="/sitemap.xml">Sitemap</a>
        </nav>
      </div>
    </footer>
  )
}
