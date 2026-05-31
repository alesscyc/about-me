import { profile } from '../data/profile'

const avatarSrc = profile.avatar ? `${import.meta.env.BASE_URL}${profile.avatar.replace(/^\//, '')}` : null

function Header() {
  return (
    <header className="header">
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={profile.name}
          className="header-avatar"
        />
      ) : (
        <div className="header-avatar-placeholder" aria-hidden="true">
          ?
        </div>
      )}
      <h1>{profile.name}</h1>
      <p className="tagline">{profile.tagline}</p>
      {profile.location && <p className="location">{profile.location}</p>}
    </header>
  )
}

export default Header
