import { profile } from '../data/profile'

function Experience() {
  if (!profile.experience || profile.experience.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {profile.experience.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h3>{item.role}</h3>
              <p className="timeline-meta">{item.company}</p>
              <p className="timeline-period">{item.period} · {item.type}</p>
              {item.description && (
                <p className="timeline-desc">{item.description}</p>
              )}
              {item.skills && (
                <div className="skill-chips">
                  {item.skills.map((s, j) => (
                    <span key={j} className="skill-chip">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
