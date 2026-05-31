import { profile } from '../data/profile'

function Header() {
  return (
    <header className="header">
      {profile.avatar ? (
        <img
          src={profile.avatar}
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
