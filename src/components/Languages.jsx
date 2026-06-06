import { useTranslation } from 'react-i18next'
import { useProfile } from '../i18n/useProfile'

function Languages() {
  const { t } = useTranslation()
  const p = useProfile()

  if (!p.languages || p.languages.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">{t('languages')}</h2>
      <div className="languages-list">
        {p.languages.map((lang, i) => (
          <div key={i} className="language-item">
            <span className="language-name">{lang.name}</span>
            <span className="language-level">{lang.level}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Languages
