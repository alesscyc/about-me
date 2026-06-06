import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useProfile } from '../i18n/useProfile'

function Certifications() {
  const { t } = useTranslation()
  const p = useProfile()
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  if (!p.certifications || p.certifications.length === 0) return null

  const total = p.certifications.length

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }, [total])

  const goTo = useCallback((index) => {
    setCurrent(index)
  }, [])

  useEffect(() => {
    if (total <= 1 || isHovered) return

    const interval = setInterval(goNext, 5000)
    return () => clearInterval(interval)
  }, [total, isHovered, goNext])

  const showNav = total > 1

  return (
    <section className="section">
      <h2 className="section-title">{t('certifications')}</h2>
      <div
        className="cert-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="cert-carousel">
          <div
            className="cert-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {p.certifications.map((cert, i) => (
              <div key={i} className="cert-item">
                <h3>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                      {cert.name}
                    </a>
                  ) : (
                    cert.name
                  )}
                </h3>
                <p className="cert-meta">{cert.issuer} &middot; {cert.date}</p>
                {cert.credentialId && (
                  <p className="cert-id">Credential ID: {cert.credentialId}</p>
                )}
              </div>
            ))}
          </div>

          {showNav && (
            <>
              <button
                type="button"
                className="cert-nav cert-nav-prev"
                onClick={goPrev}
                aria-label="Previous certification"
              >
                &#8249;
              </button>
              <button
                type="button"
                className="cert-nav cert-nav-next"
                onClick={goNext}
                aria-label="Next certification"
              >
                &#8250;
              </button>
            </>
          )}
        </div>

        {showNav && (
          <div className="cert-dots">
            {p.certifications.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`cert-dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to certification ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Certifications
