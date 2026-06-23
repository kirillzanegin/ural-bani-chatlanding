export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span>Бани под ключ от 15 м²</span>
          <span>Строим по всему Уралу</span>
        </div>
        <div className="footer-empty" />
        <div className="footer-empty" />
        <nav className="footer-legal" aria-label="Документы сайта">
          <a href="#privacy">Политика обработки персональных данных</a>
          <a href="#personal-data-consent">Согласие на обработку персональных данных</a>
          <a href="#cookies">Политика использования cookies</a>
          <a href="#top">Наверх</a>
        </nav>
      </div>
    </footer>
  )
}
