export default function LegalPage({ type }) {
  const titles = {
    privacy: 'Политика обработки персональных данных',
    'personal-data-consent': 'Согласие на обработку персональных данных',
    cookies: 'Политика использования cookies',
  }

  return (
    <main className="legal-page">
      <article className="legal-document">
        <a className="text-link" href="./">← Вернуться на сайт</a>
        <p className="eyebrow">Документы сайта</p>
        <h1>{titles[type] || titles.privacy}</h1>
        <p className="legal-subtitle">Рабочая версия документа. Перед публикацией нужно указать реквизиты оператора, адрес сайта и контактный email.</p>
        <section className="legal-section">
          <h2>1. Общие положения</h2>
          <p>Документ относится к сайту по строительству загородных бань под ключ и описывает порядок работы с данными пользователя при отправке заявки.</p>
        </section>
        <section className="legal-section">
          <h2>2. Какие данные используются</h2>
          <p>Через форму заявки могут передаваться имя, телефон, комментарий, выбранная площадь бани, состав помещений и желаемый срок строительства.</p>
        </section>
        <section className="legal-section">
          <h2>3. Цели использования</h2>
          <p>Данные нужны для связи с пользователем, подготовки предварительного расчёта, консультации, согласования проекта и дальнейшей работы по заявке.</p>
        </section>
        <section className="legal-section">
          <h2>4. Реквизиты оператора</h2>
          <p>Оператор: нужно указать.</p>
          <p>ИНН: нужно указать.</p>
          <p>Email для обращений: нужно указать.</p>
        </section>
        <div className="legal-links">
          <a href="#privacy">Политика обработки персональных данных</a>
          <a href="#personal-data-consent">Согласие на обработку персональных данных</a>
          <a href="#cookies">Политика использования cookies</a>
        </div>
      </article>
    </main>
  )
}
