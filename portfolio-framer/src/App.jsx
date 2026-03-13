import { useState } from 'react'
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

function App() {
  const [activeProject, setActiveProject] = useState(null)

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
          <button className="nav-link" onClick={() => scrollTo('#work')}>
            Work
          </button>
          <button className="nav-link" onClick={() => scrollTo('#about')}>
            About
          </button>
          <button className="nav-link" onClick={() => scrollTo('#contact')}>
            Contact
          </button>
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
              character of your project — not just how it looks, but how it will feel to be
              there.
            </p>

            <p className="about-signature">— David Lazishvili</p>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="section-header">
            <h1 className="section-title">Work</h1>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
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
                  onClick={() => setActiveProject(project)}
                >
                  <span className="project-year-pill">{project.year}</span>
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
              <p>
                For collaborations, commissions or any questions, feel free to get in touch.
              </p>
            </div>
            <div className="contact-details">
              <a href="mailto:youremail@example.com" className="contact-link">
                youremail@example.com
              </a>
              <a
                href="https://www.behance.net"
                className="contact-link"
                target="_blank"
                rel="noreferrer"
              >
                Behance
              </a>
              <a
                href="https://www.instagram.com"
                className="contact-link"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <button className="back-to-top" onClick={() => scrollTo('top')}>
          ↑ Back to Top
        </button>
        <span className="footer-credit">
          © {new Date().getFullYear()} David Lazishvili | ARCHVIZ
        </span>
      </footer>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="modal-panel"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <p className="modal-year">{activeProject.year}</p>
                  <h2 className="modal-title">{activeProject.title}</h2>
                  <p className="modal-subtitle">{activeProject.subtitle}</p>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setActiveProject(null)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-media">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="modal-image"
                  />
                </div>
                <div className="modal-description">
                  <p>
                    Here you can add a short description for this project – goals,
                    concept, software used and any notes you want to highlight.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
