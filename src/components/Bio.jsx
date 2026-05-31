import { profile } from '../data/profile'

function Bio() {
  return (
    <section className="section bio">
      <h2 className="section-title">About</h2>
      {profile.bio.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  )
}

export default Bio
