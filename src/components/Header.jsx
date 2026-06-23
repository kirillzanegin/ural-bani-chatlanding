export default function Header({ legal = false }) {
  return (
    <header className="header">
      <a className="logo" href="./">Строим уютные бани</a>
      {legal && (
        <a className="legal-return" href="./">Вернуться на основную страницу</a>
      )}
      <nav className="nav">
        <a href="#formats">Форматы</a>
        <a href="#layouts">Планировки</a>
        <a href="#cost">Стоимость</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a className="button button-small" href="#quiz">Рассчитать</a>
    </header>
  )
}
