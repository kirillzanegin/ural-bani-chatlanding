import { contactPhone } from '../data/contacts.js'

export default function Header({ legal = false }) {
  return (
    <header className={legal ? 'header header-legal' : 'header'}>
      <div className="header-brand">
        <a className="logo" href="/">Бани Урала</a>
        {legal && (
          <a className="legal-return" href="/">Вернуться на основную страницу</a>
        )}
      </div>
      <nav className="nav">
        <a href="/#project">Готовая баня</a>
        <a href="/#formats">Форматы</a>
        <a href="/#cost">Стоимость</a>
        <a href="/#knowledge">База знаний</a>
        <a href="/#faq">FAQ</a>
      </nav>
      <div className="header-actions">
        <a className="header-phone" href={contactPhone.href} aria-label={`Позвонить по номеру ${contactPhone.display}`}>
          {contactPhone.display}
        </a>
        <a className="button button-small" href="/#quiz">Рассчитать</a>
      </div>
    </header>
  )
}
