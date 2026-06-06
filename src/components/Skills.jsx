import { useTranslation } from 'react-i18next'
import { useProfile } from '../i18n/useProfile'

function Skills() {
  const { t } = useTranslation()
  const p = useProfile()

  if (!p.skills || p.skills.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">{t('skills')}</h2>
      <div className="skill-chips">
        {p.skills.map((skill, i) => (
          <span key={i} className="skill-chip">{skill}</span>
        ))}
      </div>
    </section>
  )
}

export default Skills
