import { projectPlaceholders } from '../data/projects.js'

export default function RealProjects() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Объекты</p>
          <h2>Реальные действующие проекты</h2>
          <p>Блок готов под будущие фотографии, видео, описания комплектаций и особенности объектов.</p>
        </div>
        <div className="cards-grid">
          {projectPlaceholders.map((project) => (
            <article className="card" key={project.title}>
              <div className="image-placeholder">{project.label}</div>
              <h3>{project.title}</h3>
              <p>{project.details}</p>
              <a className="text-link" href="#quiz">Хочу похожую</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
