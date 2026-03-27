import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

const projects = [
  {
    id: 'private-house-2026',
    title: 'PRIVATE HOUSE',
    subtitle: 'Exterior visualization',
    year: '2026',
    image: '/renders/private-house-2026.jpg',
  },
  {
    id: 'rustic-hotel-room-2026',
    title: 'RUSTIC STYLE HOTEL ROOM',
    subtitle: 'Interior visualization',
    year: '2026',
    image: '/renders/rustic-hotel-room-2026.jpg',
  },
  {
    id: 'dubai-lobby-2026',
    title: 'Dubai Lobby',
    subtitle: 'Lobby visualization',
    year: '2026',
    image: '/renders/dubai-lobby-2026.jpg',
  },
  {
    id: 'orchard-place-2026',
    title: 'THE ORCHARD PLACE',
    subtitle: 'Residential complex',
    year: '2026',
    image: '/renders/orchard-place-2026.jpg',
  },
  {
    id: 'apartment-next-2025',
    title: 'APARTMENT',
    subtitle: 'NEXT COLLECTION',
    year: '2025',
    image: '/renders/apartment-next-2025.jpg',
  },
  {
    id: 'next-apartment-2024',
    title: 'NEXT - APARTMENT',
    subtitle: 'Modern interior',
    year: '2024',
    image: '/renders/next-apartment-2024.jpg',
  },
  {
    id: 'paje-beach-resort-2024',
    title: 'Paje Beach Resort',
    subtitle: 'Resort visualization',
    year: '2024',
    image: '/renders/paje-beach-resort-2024.jpg',
  },
  {
    id: 'private-house-2022',
    title: 'PRIVATE HOUSE',
    subtitle: 'Family residence',
    year: '2022',
    image: '/renders/private-house-2022.jpg',
  },
  {
    id: 'private-house-2021',
    title: 'PRIVATE HOUSE',
    subtitle: 'Concept design',
    year: '2021',
    image: '/renders/private-house-2021.jpg',
  },
]

const thumbVariants = {
  initial: {
    opacity: 0.9,
    scale: 1,
    y: 0,
    boxShadow: '0 0 0 rgba(0,0,0,0)',
    borderColor: 'rgba(27,27,27,1)',
  },
  hover: {
    opacity: 1,
    scale: 1.03,
    y: -4,
    boxShadow: '0 18px 40px rgba(0,0,0,0.7)',
    borderColor: 'rgba(245,194,107,0.45)',
  },
}

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.5

function Lightbox({ project, index, onClose, onPrev, onNext }) {
  const [zoom, setZoom] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const posStart = useRef({ x: 0, y: 0 })
  const touchStart = useRef(null)

  // Reset zoom/pos when project changes
  useEffect(() => {
    setZoom(1)
    setPos({ x: 0, y: 0 })
  }, [index])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') { setZoom(1); setPos({ x: 0, y: 0 }); onNext() }
      if (e.key === 'ArrowLeft') { setZoom(1); setPos({ x: 0, y: 0 }); onPrev() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNext, onPrev])

  // Scroll to zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    setZoom(z => {
      const next = z - e.deltaY * 0.002
      return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next))
    })
  }, [])

  // Mouse drag
  const handleMouseDown = (e) => {
    if (zoom <= 1) return
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    posStart.current = { ...pos }
  }
  const handleMouseMove = (e) => {
    if (!dragging) return
    setPos({
      x: posStart.current.x + (e.clientX - dragStart.current.x),
      y: posStart.current.y + (e.clientY - dragStart.current.y),
    })
  }
  const handleMouseUp = () => setDragging(false)

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(dx) > 50) {
      if (dx < 0) { setZoom(1); setPos({ x: 0, y: 0 }); onNext() }
      else { setZoom(1); setPos({ x: 0, y: 0 }); onPrev() }
    }
    touchStart.current = null
  }

  const zoomIn = () => setZoom(z => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(1)))
  const zoomOut = () => {
    setZoom(z => {
      const next = Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(1))
      if (next === 1) setPos({ x: 0, y: 0 })
      return next
    })
  }

  return (
    <motion.div
      className="lb-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Prev */}
      <button
        className="lb-arrow lb-arrow-left"
        onClick={(e) => { e.stopPropagation(); setZoom(1); setPos({ x: 0, y: 0 }); onPrev() }}
        aria-label="Previous"
      >
        ‹
      </button>

      {/* Image container */}
      <div
        className="lb-image-wrap"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={project.id}
            src={project.image}
            alt={project.title}
            className="lb-image"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              transform: `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`,
              transition: dragging ? 'none' : 'transform 0.15s ease',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            draggable={false}
          />
        </AnimatePresence>

        {/* Info bar */}
        <div className="lb-info">
          <span className="lb-counter">{index + 1} / {projects.length}</span>
          <span className="lb-title">{project.title}</span>
          <span className="lb-subtitle">{project.subtitle}</span>
        </div>
      </div>

      {/* Next */}
      <button
        className="lb-arrow lb-arrow-right"
        onClick={(e) => { e.stopPropagation(); setZoom(1); setPos({ x: 0, y: 0 }); onNext() }}
        aria-label="Next"
      >
        ›
      </button>

      {/* Zoom controls */}
      <div className="lb-zoom-controls" onClick={(e) => e.stopPropagation()}>
        <button className="lb-zoom-btn" onClick={zoomOut} disabled={zoom <= MIN_ZOOM}>−</button>
        <span className="lb-zoom-level">{Math.round(zoom * 100)}%</span>
        <button className="lb-zoom-btn" onClick={zoomIn} disabled={zoom >= MAX_ZOOM}>+</button>
      </div>

      {/* Close */}
      <button
        className="lb-close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
    </motion.div>
  )
}

function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const goPrev = () => setLightboxIndex(i => (i - 1 + projects.length) % projects.length)
  const goNext = () => setLightboxIndex(i => (i + 1) % projects.length)

  const scrollTo = (selector) => {
    const target = selector === 'top' ? document.body : document.querySelector(selector)
    if (!target) return
    const rect = target.getBoundingClientRect()
    const offset = window.pageYOffset || document.documentElement.scrollTop
    const top = selector === 'top' ? 0 : rect.top + offset - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className="page-root">
      <header className="site-header">
        <div className="logo">
          <span className="logo-name">David Lazishvili</span>
          <span className="logo-role">ARCHVIZ</span>
        </div>
        <nav className="main-nav">
          <button className="nav-link" onClick={() => scrollTo('#work')}>Work</button>
          <button className="nav-link" onClick={() => scrollTo('#about')}>About</button>
          <button className="nav-link" onClick={() => scrollTo('#contact')}>Contact</button>
        </nav>
      </header>

      <main>
        <section id="about" className="section about-section">
          <div className="about-inner">
            <h2 className="about-eyebrow">ARCHITECTURAL VISUALIZATION STUDIO</h2>
            <h1 className="about-heading">
              VISUALIZING THE FUTURE,<br />
              FROM CONCEPT TO FINAL IMAGE.
            </h1>
            <p className="about-lead">
              Based in Tbilisi, <span>David Lazishvili Studio</span> creates narrative-focused
              architectural visuals. I collaborate with architects, designers and developers to
              transform ideas into atmospheric, photorealistic imagery.
            </p>
            <p className="about-paragraph">
              Every project is an opportunity to shape how a space will be perceived – long
              before it is built. I obsess over light, composition and materiality to make sure
              each image feels precise, but never cold; cinematic, but still believable.
            </p>
            <div className="about-divider" />
            <p className="about-quote">
              I believe that strong visualization sits where technical accuracy meets emotion.
              While I work with pixels and render engines, the real goal is to capture the
              character of your project — not just how it looks, but how it will feel to be there.
            </p>
            <p className="about-signature">— David Lazishvili</p>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="section-header">
            <h1 className="section-title">Work</h1>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-card"
                initial="initial"
                whileHover="hover"
              >
                <motion.div
                  className="project-thumb"
                  style={{ backgroundImage: `url(${project.image})` }}
                  variants={thumbVariants}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={() => openLightbox(index)}
                >
                  <span className="project-year-pill">{project.year}</span>
                  <div className="project-thumb-overlay">
                    <span className="project-thumb-expand">⤢ View</span>
                  </div>
                </motion.div>
                <div className="project-meta">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-header">
            <h2 className="section-title">Contact</h2>
          </div>
          <div className="contact-layout">
            <div className="contact-text">
              <p>For collaborations, commissions or any questions, feel free to get in touch.</p>
            </div>
            <div className="contact-details">
              <a href="mailto:youremail@example.com" className="contact-link">youremail@example.com</a>
              <a href="https://www.behance.net" className="contact-link" target="_blank" rel="noreferrer">Behance</a>
              <a href="https://www.instagram.com" className="contact-link" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <button className="back-to-top" onClick={() => scrollTo('top')}>↑ Back to Top</button>
        <span className="footer-credit">© {new Date().getFullYear()} David Lazishvili | ARCHVIZ</span>
      </footer>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            project={projects[lightboxIndex]}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App