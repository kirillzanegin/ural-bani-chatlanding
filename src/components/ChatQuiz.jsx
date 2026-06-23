import { useMemo, useState } from 'react'
import { quizSteps } from '../data/quiz.js'

export default function ChatQuiz() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({ name: '', phone: '', comment: '', consent: false })
  const [errors, setErrors] = useState({})
  const [validationAttempt, setValidationAttempt] = useState(0)
  const [submitted, setSubmitted] = useState(false)

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
      ...answers,
      contact,
      createdAt: new Date().toISOString(),
    }

    console.log('Lead payload:', lead)
    setSubmitted(true)
    window.location.hash = 'thanks'
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
              <label className={nameClass} key={`name-${validationAttempt}`}>
                Имя
                <input
                  value={contact.name}
                  onChange={(event) => updateContact('name', event.target.value)}
                  placeholder="Ваше имя"
                />
              </label>
              <label className={phoneClass} key={`phone-${validationAttempt}`}>
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
                  placeholder="Например: хочу баню с террасой, санузлом и комнатой отдыха"
                />
              </label>
              <label className={consentClass} key={`consent-${validationAttempt}`}>
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
                <button className="button button-ghost" type="button" onClick={goBack}>Назад</button>
                <button className="button button-primary" type="submit">Отправить</button>
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
