const steps = [
  'Вы оставляете заявку на сайте',
  'Менеджер уточняет площадь, помещения и пожелания',
  'Подбираем типовую планировку или готовим индивидуальный вариант',
  'Считаем стоимость под вашу комплектацию',
  'Согласовываем договор, сроки и этапы',
  'Выполняем строительство и монтаж',
  'Передаём готовую баню с гарантией 3 года',
]

export default function WorkSteps() {
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Процесс</p>
          <h2>Как проходит работа</h2>
          <p>После сдачи баня может быть полностью готова к использованию: с парной, помывочной, комнатой отдыха, инженерией, печью, дымоходом и внутренним наполнением.</p>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <article className="step" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
