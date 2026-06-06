import { useTranslation } from 'react-i18next'
import { useProfile } from '../i18n/useProfile'

function Experience() {
  const { t } = useTranslation()
  const p = useProfile()

  if (!p.experience || p.experience.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">{t('experience')}</h2>
      <div className="timeline">
        {p.experience.map((item, i) => (
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
