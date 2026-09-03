import { useState } from 'react'
import { sendLeadToWebhook } from '../utils/leadWebhook.js'
import { validateLeadContact } from '../utils/formValidation.js'

export default function FeedbackForm() {
  const [contact, setContact] = useState({ name: '', phone: '', comment: '', consent: false })
  const [errors, setErrors] = useState({})
  const [validationAttempt, setValidationAttempt] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [submissionError, setSubmissionError] = useState('')

  function updateContact(field, value) {
    setContact({ ...contact, [field]: value })
    setSubmissionError('')

    if (errors[field]) {
      setErrors({ ...errors, [field]: false })
    }
  }

  async function submitForm(event) {
    event.preventDefault()

    const nextErrors = validateLeadContact(contact)

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      setValidationAttempt((current) => current + 1)
      return
    }

    try {
      setIsSending(true)
      await sendLeadToWebhook({ formSource: 'Нижняя форма', contact })
      setSubmitted(true)
    } catch (error) {
      console.error('Lead sending error:', error)
      setSubmissionError('Не удалось отправить заявку. Проверьте подключение к интернету и попробуйте ещё раз.')
    } finally {
      setIsSending(false)
    }
  }

  const nameClass = errors.name ? 'field-error invalid-shake' : ''
  const phoneClass = errors.phone ? 'field-error invalid-shake' : ''
  const consentClass = errors.consent ? 'consent-check field-error invalid-shake' : 'consent-check'

  return (
    <section className="section section-warm" id="feedback">
      <div className="container two-column">
        <div>
          <p className="eyebrow">Обратная связь</p>
          <h2>Оставьте контакты - менеджер свяжется с вами</h2>
          <p>
            Напишите имя и телефон. Можно добавить комментарий: какая баня интересна, где участок и когда удобно обсудить проект.
          </p>
        </div>

        <div className="quiz-card feedback-card">
          {submitted ? (
            <div role="status">
              <h3>Заявка отправлена</h3>
              <p>Спасибо. Менеджер свяжется с вами и уточнит детали.</p>
            </div>
          ) : (
            <form onSubmit={submitForm} noValidate>
              <h3>Связаться с менеджером</h3>
              <label className={nameClass} htmlFor="feedback-name" key={`feedback-name-${validationAttempt}`}>
                Имя
                <input
                  id="feedback-name"
                  name="name"
                  autoComplete="name"
                  value={contact.name}
                  onChange={(event) => updateContact('name', event.target.value)}
                  placeholder="Ваше имя"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'feedback-name-error' : undefined}
                />
                {errors.name && <span className="field-message" id="feedback-name-error">{errors.name}</span>}
              </label>
              <label className={phoneClass} htmlFor="feedback-phone" key={`feedback-phone-${validationAttempt}`}>
                Телефон
                <input
                  id="feedback-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={contact.phone}
                  onChange={(event) => updateContact('phone', event.target.value)}
                  placeholder="+7 999 000-00-00"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'feedback-phone-error' : undefined}
                />
                {errors.phone && <span className="field-message" id="feedback-phone-error">{errors.phone}</span>}
              </label>
              <label htmlFor="feedback-comment">
                Комментарий, если хотите
                <textarea
                  id="feedback-comment"
                  name="comment"
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
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'feedback-consent-error' : undefined}
                />
                <span>
                  Я согласен на обработку и хранение персональных данных.{' '}
                  <a href="#personal-data-consent" target="_blank" rel="noreferrer">Открыть согласие на обработку персональных данных</a>.
                  {errors.consent && <span className="field-message" id="feedback-consent-error">{errors.consent}</span>}
                </span>
              </label>
              {submissionError && <p className="form-status-error" role="alert">{submissionError}</p>}
              <div className="quiz-actions">
                <button className="button button-primary" type="submit" disabled={isSending}>
                  {isSending ? 'Отправляем...' : 'Отправить'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
