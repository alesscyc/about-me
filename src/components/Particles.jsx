import { useEffect, useRef } from 'react'

const COLORS = ['#2563eb', '#7c3aed', '#06b6d4', '#f59e0b']
const SHAPES = ['circle', 'triangle', 'diamond']
const PARTICLE_COUNT = 45

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function drawShape(ctx, x, y, size, shape) {
  ctx.beginPath()
  switch (shape) {
    case 'circle':
      ctx.arc(x, y, size / 2, 0, Math.PI * 2)
      break
    case 'triangle':
      ctx.moveTo(x, y - size / 2)
      ctx.lineTo(x - size / 2, y + size / 2)
      ctx.lineTo(x + size / 2, y + size / 2)
      ctx.closePath()
      break
    case 'diamond':
      ctx.moveTo(x, y - size / 2)
      ctx.lineTo(x + size / 2, y)
      ctx.lineTo(x, y + size / 2)
      ctx.lineTo(x - size / 2, y)
      ctx.closePath()
      break
  }
}

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    const mouse = { x: -9999, y: -9999 }
    const REPEL_RADIUS = 150
    const REPEL_FORCE = 0.8

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function onMouseMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: randomBetween(3, 12),
        baseSpeedX: randomBetween(-0.2, 0.2),
        baseSpeedY: randomBetween(-0.15, -0.4),
        speedX: 0,
        speedY: 0,
        opacity: randomBetween(0.08, 0.25),
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: randomBetween(-0.01, 0.01),
      }))
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        let repelX = 0, repelY = 0
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE
          repelX = (dx / dist) * force
          repelY = (dy / dist) * force
        }

        p.speedX = p.baseSpeedX + repelX
        p.speedY = p.baseSpeedY + repelY
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        // Wrap around
        if (p.y + p.size < 0) {
          p.y = canvas.height + p.size
          p.x = Math.random() * canvas.width
        }
        if (p.x + p.size < 0) p.x = canvas.width + p.size
        if (p.x - p.size > canvas.width) p.x = -p.size

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        drawShape(ctx, 0, 0, p.size, p.shape)
        ctx.fill()
        ctx.restore()
      }

      // Draw faint connections between particles near the cursor
      const nearby = particles.filter(p => {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        return Math.sqrt(dx * dx + dy * dy) < REPEL_RADIUS * 1.5
      })
      for (let i = 0; i < nearby.length; i++) {
        for (let j = i + 1; j < nearby.length; j++) {
          const a = nearby[i], b = nearby[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${(1 - d / 120) * 0.12})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    window.addEventListener('resize', () => { resize(); initParticles(); })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}
