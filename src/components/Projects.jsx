import { profile } from '../data/profile'

function Projects() {
  if (!profile.projects || profile.projects.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">Projects</h2>
      <div className="project-list">
        {profile.projects.map((project, i) => (
          <div key={i} className="project-card">
            <h3>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
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
