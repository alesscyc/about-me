import { useTranslation } from 'react-i18next'
import { useProfile } from '../i18n/useProfile'

function Projects() {
  const { t } = useTranslation()
  const p = useProfile()

  if (!p.projects || p.projects.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">{t('projects')}</h2>
      <div className="project-list">
        {p.projects.map((project, i) => (
          <div key={i} className="project-card">
            <h3>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            </h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
