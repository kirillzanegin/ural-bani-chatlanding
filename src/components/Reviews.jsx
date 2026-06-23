export default function Reviews() {
  return (
    <section className="section section-warm">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Отзывы</p>
          <h2>Отзывы и видеообзоры</h2>
          <p>Пока здесь стоят аккуратные заглушки. Позже блок наполним реальными отзывами, видео и фотоотчётами.</p>
        </div>
        <div className="cards-grid">
          <article className="card"><div className="image-placeholder">Здесь будет видеообзор готовой бани 30 м²</div><h3>Видеообзор</h3></article>
          <article className="card"><div className="image-placeholder">Здесь будет отзыв владельца бани 40 м²</div><h3>Отзыв клиента</h3></article>
          <article className="card"><div className="image-placeholder">Здесь будет фотоотчёт строительства</div><h3>Фотоотчёт</h3></article>
        </div>
      </div>
    </section>
  )
}
