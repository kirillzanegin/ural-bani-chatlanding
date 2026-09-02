import { featuredProject } from '../data/projects.js'

export default function RealProjects() {
  return (
    <section className="section project-section" id="project">
      <div className="container project-intro">
        <div>
          <p className="eyebrow">Готовый объект</p>
          <h2>{featuredProject.title}</h2>
        </div>
        <div className="project-copy">
          <ul className="project-features">
            {featuredProject.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <a className="button button-primary" href="#quiz">Обсудить похожую баню</a>
        </div>
      </div>

      <div className="container project-gallery" aria-label="Фотографии готовой бани">
        {featuredProject.images.map((image, index) => (
          <figure className={`project-gallery-item project-gallery-item-${index + 1}`} key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  )
}
