import { useState } from 'react'

export default function FeedbackForm() {
  const [contact, setContact] = useState({ name: '', phone: '', comment: '', consent: false })
  const [errors, setErrors] = useState({})
  const [validationAttempt, setValidationAttempt] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  function updateContact(field, value) {
    setContact({ ...contact, [field]: value })

    if (errors[field]) {
      setErrors({ ...errors, [field]: false })
    }
  }

  function submitForm(event) {
    event.preventDefault()

    const nextErrors = {
      name: !contact.name.trim(),
      phone: !contact.phone.trim(),
      consent: !contact.consent,
    }

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      setValidationAttempt((current) => current + 1)
      return
    }

    const lead = {
      source: 'feedback-form',
      contact,
      createdAt: new Date().toISOString(),
    }

    console.log('Feedback payload:', lead)
    setSubmitted(true)
  }

  const nameClass = errors.name ? 'field-error invalid-shake' : ''
  const phoneClass = errors.phone ? 'field-error invalid-shake' : ''
  const consentClass = errors.consent ? 'consent-check field-error invalid-shake' : 'consent-check'

  return (
    <section className="section section-warm" id="feedback">
      <div className="container two-column">
        <div>
          <p className="eyebrow">Обратная связь</p>
          <h2>Оставьте контакты — менеджер свяжется с вами</h2>
          <p>
            Напишите имя и телефон. Можно добавить комментарий: какая баня интересна, где участок и когда удобно обсудить проект.
          </p>
        </div>

        <div className="quiz-card feedback-card">
          {submitted ? (
            <div>
              <h3>Заявка отправлена</h3>
              <p>Спасибо. Менеджер свяжется с вами и уточнит детали.</p>
            </div>
          ) : (
            <form onSubmit={submitForm} noValidate>
              <h3>Связаться с менеджером</h3>
              <label className={nameClass} key={`feedback-name-${validationAttempt}`}>
                Имя
                <input
                  value={contact.name}
                  onChange={(event) => updateContact('name', event.target.value)}
                  placeholder="Ваше имя"
                />
              </label>
              <label className={phoneClass} key={`feedback-phone-${validationAttempt}`}>
                Телефон
                <input
                  value={contact.phone}
                  onChange={(event) => updateContact('phone', event.target.value)}
                  placeholder="+7"
                />
              </label>
              <label>
                Комментарий, если хотите
                <textarea
                  value={contact.comment}
                  onChange={(event) => updateContact('comment', event.target.value)}
                  placeholder="Например: хочу обсудить баню 30 м² с террасой"
                />
              </label>
              <label className={consentClass} key={`feedback-consent-${validationAttempt}`}>
                <input
                  type="checkbox"
                  checked={contact.consent}
                  onChange={(event) => updateContact('consent', event.target.checked)}
                />
                <span>
                  Я согласен на обработку и хранение персональных данных.{' '}
                  <a href="#personal-data-consent">Открыть согласие на обработку персональных данных</a>.
                </span>
              </label>
              <div className="quiz-actions">
                <button className="button button-primary" type="submit">Отправить</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
