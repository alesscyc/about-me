import { profile } from '../data/profile'

function Skills() {
  if (!profile.skills || profile.skills.length === 0) return null

  return (
    <section className="section">
      <h2 className="section-title">Skills</h2>
      <div className="skill-chips">
        {profile.skills.map((skill, i) => (
          <span key={i} className="skill-chip">{skill}</span>
        ))}
      </div>
    </section>
  )
}

export default Skills
