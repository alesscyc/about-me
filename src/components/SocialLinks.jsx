import { profile } from '../data/profile'

function SocialLinks() {
  if (!profile.socials || profile.socials.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">Connect</h2>
      <div className="social-links">
        {profile.socials.map((social, i) => (
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
