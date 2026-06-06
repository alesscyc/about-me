import { useTranslation } from 'react-i18next'
import { useProfile } from '../i18n/useProfile'

function Bio() {
  const { t } = useTranslation()
  const p = useProfile()

  return (
    <section className="section bio">
      <h2 className="section-title">{t('about')}</h2>
      {p.bio.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  )
}

export default Bio
