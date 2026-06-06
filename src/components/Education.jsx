import { useTranslation } from 'react-i18next'
import { useProfile } from '../i18n/useProfile'

function Education() {
  const { t } = useTranslation()
  const p = useProfile()

  if (!p.education || p.education.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">{t('education')}</h2>
      <div className="timeline">
        {p.education.map((item, i) => (
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
