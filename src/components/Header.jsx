export default function Header() {
  return (
    <header className="header">
      <a className="logo" href="./">Бани Урала</a>
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
