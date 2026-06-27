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
        <a href="/#formats">Форматы</a>
        <a href="/#layouts">Планировки</a>
        <a href="/#cost">Стоимость</a>
        <a href="/#knowledge">База знаний</a>
        <a href="/#faq">FAQ</a>
      </nav>
      <a className="button button-small" href="/#feedback">Рассчитать</a>
    </header>
  )
}
