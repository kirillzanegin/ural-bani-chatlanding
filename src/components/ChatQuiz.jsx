import { useMemo, useState } from 'react'
import { quizSteps } from '../data/quiz.js'

export default function ChatQuiz() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({ name: '', phone: '', comment: '', consent: false })
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

    if (!contact.phone.trim()) {
      alert('Укажите телефон для связи')
      return
    }

    if (!contact.consent) {
      alert('Нужно согласие на обработку персональных данных')
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
            <form onSubmit={submitForm}>
              <h3>Куда отправить предварительный расчёт?</h3>
              <label>
                Имя
                <input
                  value={contact.name}
                  onChange={(event) => setContact({ ...contact, name: event.target.value })}
                  placeholder="Ваше имя"
                />
              </label>
              <label>
                Телефон
                <input
                  value={contact.phone}
                  onChange={(event) => setContact({ ...contact, phone: event.target.value })}
                  placeholder="+7"
                  required
                />
              </label>
              <label>
                Комментарий, если хотите
                <textarea
                  value={contact.comment}
                  onChange={(event) => setContact({ ...contact, comment: event.target.value })}
                  placeholder="Например: хочу баню с террасой, санузлом и комнатой отдыха"
                />
              </label>
              <label className="consent-check">
                <input
                  type="checkbox"
                  checked={contact.consent}
                  onChange={(event) => setContact({ ...contact, consent: event.target.checked })}
                  required
                />
                <span>
                  Я согласен на обработку персональных данных и ознакомлен с{' '}
                  <a href="#personal-data-consent">согласием на обработку персональных данных</a>.
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
              {step.customLabel && (
                <label className="custom-answer">
                  {step.customLabel}
                  <input
                    value={answers[`${step.id}Custom`] || ''}
                    onChange={(event) => setCustomAnswer(event.target.value)}
                    placeholder={step.customPlaceholder}
                  />
                </label>
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
