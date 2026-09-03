import { contactPhone } from '../data/contacts.js'

export default function Thanks() {
  return (
    <main className="thanks-page">
      <section className="thanks-card">
        <p className="eyebrow">Заявка отправлена</p>
        <h1>Спасибо. Менеджер уточнит детали и подготовит предварительный расчёт.</h1>
        <p>
          Мы свяжемся с вами, чтобы уточнить площадь, помещения, комплектацию и особенности проекта.
        </p>
        <div className="thanks-actions">
          <a className="button button-primary" href="./">Вернуться на главную</a>
          <a className="thanks-phone" href={contactPhone.href}>Позвонить: {contactPhone.display}</a>
        </div>
      </section>
    </main>
  )
}
