import { useTranslation } from 'react-i18next'
import { useProfile } from '../i18n/useProfile'

function SocialLinks() {
  const { t } = useTranslation()
  const p = useProfile()

  if (!p.socials || p.socials.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">{t('connect')}</h2>
      <div className="social-links">
        {p.socials.map((social, i) => (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            {social.label}
          </a>
        ))}
      </div>
    </section>
  )
}

export default SocialLinks
