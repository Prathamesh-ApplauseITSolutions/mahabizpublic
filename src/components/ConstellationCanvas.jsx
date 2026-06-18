import { useEffect, useRef } from 'react'

/* ─── tuneable constants ───────────────────────────────────────────────── */
const NODE_COUNT        = 55
const CONNECT_DIST      = 165
const PACKET_INTERVAL   = 1600
const PULSE_CHANCE      = 0.20
const BASE_SPEED        = 0.28
const MOUSE_RADIUS      = 140
const MOUSE_STRENGTH    = 0.018
const MOUSE_LINE_DIST   = 180

/* ─── Gold palette (hero) ──────────────────────────────────────────────── */
const GOLD_LIGHT = {
  nodeFill   : 'rgba(184,134,11,0.72)',
  nodeGlow   : 'rgba(255,200,55,0.35)',
  nodeHighlight: 'rgba(255,230,100,0.95)',
  line       : (a) => `rgba(184,134,11,${a})`,
  pulse      : 'rgba(255,185,0,',
  packet     : '#FFB800',
  packetGlow : 'rgba(255,185,0,0.60)',
  mouseLine  : (a) => `rgba(255,160,0,${a})`,
}
const GOLD_DARK = {
  nodeFill   : 'rgba(255,200,55,0.75)',
  nodeGlow   : 'rgba(255,215,0,0.30)',
  nodeHighlight: 'rgba(255,240,160,0.95)',
  line       : (a) => `rgba(255,195,40,${a})`,
  pulse      : 'rgba(255,210,60,',
  packet     : '#FFD700',
  packetGlow : 'rgba(255,215,0,0.65)',
  mouseLine  : (a) => `rgba(255,215,0,${a})`,
}

/* ─── Subtle off-white palette (page background) ───────────────────────── */
const SUBTLE_LIGHT = {
  nodeFill   : 'rgba(200,210,225,0.55)',
  nodeGlow   : 'rgba(210,220,235,0.25)',
  nodeHighlight: 'rgba(240,244,250,0.85)',
  line       : (a) => `rgba(180,195,215,${a})`,
  pulse      : 'rgba(180,195,215,',
  packet     : 'rgba(190,205,225,0.9)',
  packetGlow : 'rgba(190,205,225,0.35)',
  mouseLine  : (a) => `rgba(160,180,210,${a})`,
}
const SUBTLE_DARK = {
  nodeFill   : 'rgba(255,255,255,0.12)',
  nodeGlow   : 'rgba(255,255,255,0.06)',
  nodeHighlight: 'rgba(255,255,255,0.18)',
  line       : (a) => `rgba(255,255,255,${a})`,
  pulse      : 'rgba(255,255,255,',
  packet     : 'rgba(255,255,255,0.4)',
  packetGlow : 'rgba(255,255,255,0.12)',
  mouseLine  : (a) => `rgba(255,255,255,${a})`,
}

/* ─── helpers ──────────────────────────────────────────────────────────── */
const rand  = (lo, hi)     => Math.random() * (hi - lo) + lo
const hypot = (a, b)       => Math.hypot(a.x - b.x, a.y - b.y)
const clamp = (v, lo, hi)  => Math.max(lo, Math.min(hi, v))

/* ─── Component ────────────────────────────────────────────────────────── */
export default function ConstellationCanvas({ className = '', variant = 'gold' }) {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999, active: false })
  const isSubtle  = variant === 'subtle'

  /* subtle variant uses fewer, slower nodes */
  const NODE_N      = isSubtle ? 38 : NODE_COUNT
  const SPEED       = isSubtle ? 0.16 : BASE_SPEED
  const PULSE_C     = isSubtle ? 0.12 : PULSE_CHANCE
  const EDGE_DIST   = isSubtle ? 145  : CONNECT_DIST
  const PKT_INT     = isSubtle ? 2800 : PACKET_INTERVAL
  const NODE_R_MIN  = isSubtle ? 1.0  : 1.3
  const NODE_R_MAX  = isSubtle ? 2.4  : 3.2

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    /* resize */
    let W = 0, H = 0
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* colour theme */
    const isDark = () => document.documentElement.classList.contains('dark')
    const C = () => {
      if (isSubtle) return isDark() ? SUBTLE_DARK : SUBTLE_LIGHT
      return isDark() ? GOLD_DARK : GOLD_LIGHT
    }

    /* mouse tracking – only for gold (hero) variant */
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true }
    }
    const onMouseLeave = () => { mouseRef.current.active = false }
    const section = canvas.parentElement
    if (!isSubtle) {
      section?.addEventListener('mousemove', onMouseMove)
      section?.addEventListener('mouseleave', onMouseLeave)
    }

    /* nodes */
    const nodes = Array.from({ length: NODE_N }, () => ({
      x      : rand(0, W || 1400),
      y      : rand(0, H || 800),
      r      : rand(NODE_R_MIN, NODE_R_MAX),
      vx     : rand(-SPEED, SPEED),
      vy     : rand(-SPEED, SPEED),
      pulse  : Math.random() < PULSE_C,
      pulseR : rand(0, 30),
    }))

    /* data packets */
    const packets = []
    let packetTimer = 0
    const spawnPacket = () => {
      for (let i = 0; i < 20; i++) {
        const ai = Math.floor(Math.random() * nodes.length)
        const bi = Math.floor(Math.random() * nodes.length)
        if (ai === bi) continue
        if (hypot(nodes[ai], nodes[bi]) < EDGE_DIST) {
          packets.push({ a: nodes[ai], b: nodes[bi], t: 0 })
          return
        }
      }
    }

    /* animation loop */
    let raf
    let last = performance.now()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      const dt  = Math.min(now - last, 50)
      last = now
      const pal = C()
      const mx  = mouseRef.current

      ctx.clearRect(0, 0, W, H)

      /* move & attract nodes */
      if (!prefersReduced) {
        for (const n of nodes) {
          if (!isSubtle && mx.active) {
            const dx = mx.x - n.x, dy = mx.y - n.y
            const d  = Math.sqrt(dx * dx + dy * dy)
            if (d < MOUSE_RADIUS && d > 0.1) {
              const force = (1 - d / MOUSE_RADIUS) * MOUSE_STRENGTH
              n.vx += dx * force
              n.vy += dy * force
            }
          }
          n.vx += rand(-0.003, 0.003)
          n.vy += rand(-0.003, 0.003)
          const maxV = SPEED * 2.2
          n.vx = clamp(n.vx, -maxV, maxV)
          n.vy = clamp(n.vy, -maxV, maxV)
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0)  { n.x = 0;  n.vx =  Math.abs(n.vx) }
          if (n.x > W)  { n.x = W;  n.vx = -Math.abs(n.vx) }
          if (n.y < 0)  { n.y = 0;  n.vy =  Math.abs(n.vy) }
          if (n.y > H)  { n.y = H;  n.vy = -Math.abs(n.vy) }
        }
      }

      /* draw edges */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = hypot(nodes[i], nodes[j])
          if (d >= EDGE_DIST) continue
          const alpha = (1 - d / EDGE_DIST) * (isSubtle ? 0.28 : 0.42)
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = pal.line(alpha.toFixed(3))
          ctx.lineWidth   = isSubtle ? 0.6 : 0.9
          ctx.stroke()
        }
      }

      /* mouse lines (gold / hero only) */
      if (!isSubtle && mx.active && !prefersReduced) {
        for (const n of nodes) {
          const d = Math.hypot(mx.x - n.x, mx.y - n.y)
          if (d < MOUSE_LINE_DIST) {
            const alpha = (1 - d / MOUSE_LINE_DIST) * 0.65
            ctx.beginPath()
            ctx.moveTo(mx.x, mx.y)
            ctx.lineTo(n.x, n.y)
            ctx.strokeStyle = pal.mouseLine(alpha.toFixed(3))
            ctx.lineWidth   = 1.1
            ctx.stroke()
          }
        }
      }

      /* draw nodes */
      for (const n of nodes) {
        /* pulse ring */
        if (n.pulse && !prefersReduced) {
          n.pulseR = (n.pulseR + (isSubtle ? 0.25 : 0.4)) % (EDGE_DIST * 0.32)
          const pAlpha = (1 - n.pulseR / (EDGE_DIST * 0.32)) * (isSubtle ? 0.25 : 0.45)
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + n.pulseR, 0, Math.PI * 2)
          ctx.strokeStyle = `${pal.pulse}${pAlpha.toFixed(3)})`
          ctx.lineWidth   = isSubtle ? 0.7 : 1.2
          ctx.stroke()
        }

        /* glow halo */
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5)
        glow.addColorStop(0, pal.nodeGlow)
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        /* solid core with inner highlight */
        const core = ctx.createRadialGradient(
          n.x - n.r * 0.3, n.y - n.r * 0.3, 0,
          n.x, n.y, n.r
        )
        core.addColorStop(0, pal.nodeHighlight)
        core.addColorStop(1, pal.nodeFill)
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = core
        ctx.fill()
      }

      /* data packets */
      if (!prefersReduced) {
        packetTimer += dt
        if (packetTimer >= PKT_INT) {
          packetTimer = 0
          spawnPacket()
        }
        for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i]
          p.t += dt / (isSubtle ? 1200 : 850)
          if (p.t >= 1) { packets.splice(i, 1); continue }
          const x = p.a.x + (p.b.x - p.a.x) * p.t
          const y = p.a.y + (p.b.y - p.a.y) * p.t
          const pg = ctx.createRadialGradient(x, y, 0, x, y, isSubtle ? 5 : 8)
          pg.addColorStop(0, pal.packetGlow)
          pg.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(x, y, isSubtle ? 5 : 8, 0, Math.PI * 2)
          ctx.fillStyle = pg
          ctx.fill()
          ctx.beginPath()
          ctx.arc(x, y, isSubtle ? 1.4 : 2.4, 0, Math.PI * 2)
          ctx.fillStyle = pal.packet
          ctx.fill()
        }
      }
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (!isSubtle) {
        section?.removeEventListener('mousemove', onMouseMove)
        section?.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
