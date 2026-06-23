import { faqItems } from '../data/faq.js'

export default function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">FAQ</p>
          <h2>Частые вопросы</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
