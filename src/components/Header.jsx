import { useProfile } from '../i18n/useProfile'

function Header() {
  const p = useProfile()
  const avatarSrc = p.avatar ? `${import.meta.env.BASE_URL}${p.avatar.replace(/^\//, '')}` : null

  return (
    <header className="header">
      {avatarSrc ? (
        <img src={avatarSrc} alt={p.name} className="header-avatar" />
      ) : (
        <div className="header-avatar-placeholder" aria-hidden="true">?</div>
      )}
      <h1>{p.name}</h1>
      <p className="tagline">{p.tagline}</p>
      {p.location && <p className="location">{p.location}</p>}
    </header>
  )
}

export default Header
