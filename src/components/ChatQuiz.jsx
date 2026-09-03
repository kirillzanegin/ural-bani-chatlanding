import { useMemo, useState } from 'react'
import { quizSteps } from '../data/quiz.js'
import { sendLeadToWebhook } from '../utils/leadWebhook.js'
import { validateLeadContact } from '../utils/formValidation.js'

export default function ChatQuiz() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({ name: '', phone: '', comment: '', consent: false })
  const [errors, setErrors] = useState({})
  const [validationAttempt, setValidationAttempt] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [submissionError, setSubmissionError] = useState('')

  const step = quizSteps[stepIndex]
  const isContactStep = stepIndex >= quizSteps.length

  const selected = useMemo(() => answers[step?.id] || [], [answers, step])

  function toggleOption(option) {
    if (!step) return

    if (step.type === 'multi') {
      const current = answers[step.id] || []
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
      setAnswers({ ...answers, [step.id]: next })
      return
    }

    setAnswers({ ...answers, [step.id]: [option] })
  }

  function setCustomAnswer(value) {
    if (!step) return
    setAnswers({ ...answers, [`${step.id}Custom`]: value })
  }

  function updateContact(field, value) {
    setContact({ ...contact, [field]: value })
    setSubmissionError('')

    if (errors[field]) {
      setErrors({ ...errors, [field]: false })
    }
  }

  function goNext() {
    if (stepIndex < quizSteps.length) {
      setStepIndex(stepIndex + 1)
    }
  }

  function goBack() {
    setStepIndex(Math.max(0, stepIndex - 1))
  }

  async function submitForm(event) {
    event.preventDefault()

    const nextErrors = validateLeadContact(contact)

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      setValidationAttempt((current) => current + 1)
      return
    }

    const lead = {
      formSource: 'Чат-опрос',
      name: contact.name.trim(),
      phone: contact.phone.trim(),
      comment: contact.comment.trim(),
      area: answers.area || [],
      areaCustom: answers.areaCustom || '',
      rooms: answers.rooms || [],
      roomsCustom: answers.roomsCustom || '',
      term: answers.term || [],
      consent: contact.consent,
      quizAnswers: answers,
    }

    try {
      setIsSending(true)
      await sendLeadToWebhook(lead)
      setSubmitted(true)
      window.location.hash = 'thanks'
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
    <section className="section section-warm" id="quiz">
      <div className="container two-column">
        <div>
          <p className="eyebrow">Расчёт сметы</p>
          <h2>Подберите формат бани за несколько шагов</h2>
          <p>
            Ответьте на короткие вопросы. Менеджер уточнит детали, комплектацию и подготовит индивидуальный расчёт под вашу площадь и задачи.
          </p>
        </div>

        <div className="quiz-card">
          {submitted ? (
            <div>
              <h3>Заявка подготовлена</h3>
              <p>Спасибо. Менеджер уточнит детали и подготовит предварительный расчёт.</p>
            </div>
          ) : isContactStep ? (
            <form onSubmit={submitForm} noValidate>
              <h3>Куда отправить предварительный расчёт?</h3>
              <label className={nameClass} htmlFor="quiz-name" key={`name-${validationAttempt}`}>
                Имя
                <input
                  id="quiz-name"
                  name="name"
                  autoComplete="name"
                  value={contact.name}
                  onChange={(event) => updateContact('name', event.target.value)}
                  placeholder="Ваше имя"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'quiz-name-error' : undefined}
                />
                {errors.name && <span className="field-message" id="quiz-name-error">{errors.name}</span>}
              </label>
              <label className={phoneClass} htmlFor="quiz-phone" key={`phone-${validationAttempt}`}>
                Телефон
                <input
                  id="quiz-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={contact.phone}
                  onChange={(event) => updateContact('phone', event.target.value)}
                  placeholder="+7 999 000-00-00"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'quiz-phone-error' : undefined}
                />
                {errors.phone && <span className="field-message" id="quiz-phone-error">{errors.phone}</span>}
              </label>
              <label htmlFor="quiz-comment">
                Комментарий, если хотите
                <textarea
                  id="quiz-comment"
                  name="comment"
                  value={contact.comment}
                  onChange={(event) => updateContact('comment', event.target.value)}
                  placeholder="Например: хочу баню с террасой, санузлом и комнатой отдыха"
                />
              </label>
              <label className={consentClass} key={`consent-${validationAttempt}`}>
                <input
                  type="checkbox"
                  checked={contact.consent}
                  onChange={(event) => updateContact('consent', event.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'quiz-consent-error' : undefined}
                />
                <span>
                  Я согласен на обработку и хранение персональных данных.{' '}
                  <a href="#personal-data-consent" target="_blank" rel="noreferrer">Открыть согласие на обработку персональных данных</a>.
                  {errors.consent && <span className="field-message" id="quiz-consent-error">{errors.consent}</span>}
                </span>
              </label>
              {submissionError && <p className="form-status-error" role="alert">{submissionError}</p>}
              <div className="quiz-actions">
                <button className="button button-ghost" type="button" onClick={goBack}>Назад</button>
                <button className="button button-primary" type="submit" disabled={isSending}>
                  {isSending ? 'Отправляем...' : 'Отправить'}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="quiz-progress">Вопрос {stepIndex + 1} из {quizSteps.length}</div>
              <h3>{step.title}</h3>
              <div className="option-grid">
                {step.options.map((option) => (
                  <button
                    className={selected.includes(option) ? 'option selected' : 'option'}
                    type="button"
                    key={option}
                    onClick={() => toggleOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {step.customPlaceholder && (
                <div className="custom-answer">
                  <input
                    aria-label={step.customPlaceholder}
                    value={answers[`${step.id}Custom`] || ''}
                    onChange={(event) => setCustomAnswer(event.target.value)}
                    placeholder={step.customPlaceholder}
                  />
                </div>
              )}
              <div className="quiz-actions">
                {stepIndex > 0 && <button className="button button-ghost" type="button" onClick={goBack}>Назад</button>}
                <button className="button button-primary" type="button" onClick={goNext}>
                  {stepIndex === quizSteps.length - 1 ? 'К контактам' : 'Дальше'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
