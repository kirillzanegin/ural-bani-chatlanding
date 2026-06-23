import { useState } from 'react'

const items = [
  'площадь бани',
  'планировка',
  'состав помещений',
  'парная',
  'помывочная',
  'комната отдыха',
  'санузел',
  'терраса',
  'мини-кухня',
  'спальня / гостевая',
  'панорамные окна',
  'второй свет',
  'фундамент',
  'особенности участка',
  'удалённость объекта',
  'проектирование',
  'кровля',
  'утепление',
  'наружная отделка',
  'внутренняя отделка',
  'печь',
  'дымоход',
  'электрика',
  'вентиляция',
  'водоснабжение',
  'канализация',
  'мебель и внутреннее наполнение',
  'доставка и монтаж',
]

export default function Included() {
  const [selected, setSelected] = useState([])

  function toggleItem(item) {
    setSelected((current) => (
      current.includes(item)
        ? current.filter((selectedItem) => selectedItem !== item)
        : [...current, item]
    ))
  }

  return (
    <section className="section section-dark" id="cost">
      <div className="container two-column">
        <div>
          <p className="eyebrow">Комплектация и стоимость</p>
          <h2>Что влияет на стоимость бани</h2>
          <p>
            Итоговая смета зависит от площади, планировки, состава помещений, инженерии, фундамента, отделки, печи, дымохода, остекления и внутреннего наполнения.
          </p>
          <p className="accent-note">
            Цена, указанная на сайте в 100 000 руб/м2, является ориентировочной и может меняться как в меньшую, так и в большую сторону в зависимости от выбранного вами решения.
          </p>
          <a className="button button-primary" href="#feedback">Получить предварительный расчёт</a>
        </div>
        <div className="pill-grid interactive-pill-grid">
          {items.map((item) => {
            const isSelected = selected.includes(item)

            return (
              <button
                className={isSelected ? 'pill interactive-pill selected' : 'pill interactive-pill'}
                type="button"
                key={item}
                onClick={() => toggleItem(item)}
                aria-pressed={isSelected}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
