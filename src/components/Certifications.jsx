import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useProfile } from '../i18n/useProfile'

function Certifications() {
  const { t } = useTranslation()
  const p = useProfile()
  const [current, setCurrent] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [noTransition, setNoTransition] = useState(false)
  const trackRef = useRef(null)
  const transitioningRef = useRef(false)

  if (!p.certifications || p.certifications.length === 0) return null

  const certs = p.certifications
  const total = certs.length
  const showNav = total > 1

  const jumpToReal = useCallback(
    (idx) => {
      if (idx === 0) {
        setNoTransition(true)
        setCurrent(total)
      } else if (idx === total + 1) {
        setNoTransition(true)
        setCurrent(1)
      }
      transitioningRef.current = false
    },
    [total],
  )

  const navigate = useCallback(
    (getNext) => {
      if (transitioningRef.current) return
      transitioningRef.current = true
      setNoTransition(false)
      setCurrent((prev) => getNext(prev))
    },
    [],
  )

  const goNext = useCallback(() => navigate((prev) => prev + 1), [navigate])
  const goPrev = useCallback(() => navigate((prev) => prev - 1), [navigate])
  const goTo = useCallback(
    (index) => navigate(() => index + 1),
    [navigate],
  )

  // Re-enable transitions after a jump
  useEffect(() => {
    if (!noTransition) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setNoTransition(false)
      })
    })
    return () => cancelAnimationFrame(id)
  }, [noTransition])

  // After transition ends, jump to real if on a clone
  useEffect(() => {
    const track = trackRef.current
    if (!track || !showNav) return

    const onTransitionEnd = (e) => {
      // Only act on the transform transition, not nested transitions
      if (e.target !== track) return
      jumpToReal(current)
    }
    track.addEventListener('transitionend', onTransitionEnd)
    return () => track.removeEventListener('transitionend', onTransitionEnd)
  }, [showNav, current, jumpToReal])

  // Auto-advance
  useEffect(() => {
    if (total <= 1 || isHovered) return
    const interval = setInterval(goNext, 5000)
    return () => clearInterval(interval)
  }, [total, isHovered, goNext])

  // Build cloned list: [clone of last, ...real, clone of first]
  const slides = showNav
    ? [certs[total - 1], ...certs, certs[0]]
    : certs

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
            ref={trackRef}
            className="cert-track"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: noTransition ? 'none' : undefined,
            }}
          >
            {slides.map((cert, i) => (
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
            {certs.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`cert-dot ${(current - 1 + total) % total === i ? 'active' : ''}`}
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
