import { profile } from '../data/profile'

function Education() {
  if (!profile.education || profile.education.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">Education</h2>
      <div className="timeline">
        {profile.education.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h3>{item.degree}</h3>
              <p className="timeline-meta">{item.school}</p>
              <p className="timeline-period">{item.period}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education
