import { useMemo, useState } from 'react'
import './App.scss'
import logo from '../assets/tapi.webp'
// import logo from '../assets/logo.jpeg'
import services1 from '../assets/services/colchones.jpeg'
import services2 from '../assets/services/sillones.jpeg'
import services3 from '../assets/services/vehiculos.jpeg'
import results1 from '../assets/results/auto-1.jpeg'
import results2 from '../assets/results/auto-2.jpeg'
import results3 from '../assets/results/colchones.jpeg'
import results4 from '../assets/results/sillon.jpeg'
import instagramIcon from '../assets/instagram.png'
import whatsappIcon from '../assets/whatsapp.png'

const services = [
  {
    title: 'Limpieza y cuidado especializado',
    description: 'Restauramos superficies, textiles y acabados con procesos seguros y de alto rendimiento.',
    benefits: ['Detalle profesional', 'Resultados visibles', 'Cuidado del material'],
    image: services1,
  },
  {
    title: 'Muebles y sillones',
    description: 'Recuperamos la estética y la comodidad de tus piezas con atención de detalle.',
    benefits: ['Renovación completa', 'Higiene y frescura', 'Acabados impecables'],
    image: services2,
  },
  {
    title: 'Vehículos',
    description: 'Ofrecemos limpieza profunda y mantenimiento visual para autos, camionetas y más.',
    benefits: ['Limpieza interior y exterior', 'Brillo duradero', 'Atención total'],
    image: services3,
  },
]

const galleryImages = [results1, results2, results3, results4]
const contactEmail = 'tapifreshll@gmail.com'
const contactPhone = '+5493547454709'
const whatsappNumber = '5493547454709'
const emptyForm = {
  name: '',
  neighborhood: '',
  message: '',
}

const faqItems = [
  {
    question: '¿Trabajan a domicilio?',
    answer: 'Sí. Todos nuestros trabajos se realizan a domicilio, para que puedas disfrutar del servicio de limpieza de tus tapizados sin necesidad de trasladarlos.',
  },
  {
    question: '¿Qué tipo de trabajos realizan?',
    answer: 'Realizamos servicios de limpieza y desinfección de colchones, sillones, sillas, interiores de vehículos y todo tipo de tapizados.',
  },
  {
    question: '¿Cuánto tarda un trabajo?',
    answer: 'El tiempo depende del tipo de servicio, pero normalmente comunicamos un rango claro antes de iniciar.',
  },
  {
    question: '¿Cuánto tiempo tarda en secar mi producto?',
    answer: 'El tiempo depende del tipo de trabajo a realizar y el clima. Recomendamos mínimo 3 horas de secado con ventilación para evitar futuros olores.',
  },
]

// const reviews = [
//   {
//     name: 'Cliente satisfecho',
//     text: 'Excelente atención, resultados impecables y mucho cuidado en cada detalle.',
//   },
//   {
//     name: 'Opinión pendiente',
//     text: 'Próximamente estaremos publicando reseñas de Google Business Profile para compartir testimonios reales.',
//   },
//   {
//     name: 'Más opiniones',
//     text: 'Esta sección se actualizará cuando tengamos nuevas valoraciones verificadas.',
//   },
// ]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openImage, setOpenImage] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activeFaq, setActiveFaq] = useState(-1)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' })

  const activeImage = useMemo(() => galleryImages[activeIndex], [activeIndex])

  const openPreview = (index) => {
    setActiveIndex(index)
    setOpenImage(galleryImages[index])
    setZoomLevel(1)
  }

  const closePreview = () => {
    setOpenImage(null)
    setZoomLevel(1)
  }

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length)
    setZoomLevel(1)
  }

  const showPrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setZoomLevel(1)
  }

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1))

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formStatus.type !== 'idle') {
      setFormStatus({ type: 'idle', message: '' })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const { name, neighborhood, message } = formData
    if (!name.trim() || !neighborhood.trim() || !message.trim()) {
      setFormStatus({ type: 'error', message: 'Completá todos los campos para enviar tu consulta.' })
      return
    }

    const fullMessage = `Hola, mi nombre es ${name.trim()}%0Avivo en ${neighborhood.trim()}%0A${message.trim()}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${fullMessage}`
    const anchor = document.createElement('a')
    anchor.href = whatsappUrl
    anchor.target = '_blank'
    anchor.rel = 'noopener,noreferrer'
    anchor.click()

    setFormData(emptyForm)
    setFormStatus({ type: 'success', message: 'Se abrirá WhatsApp con tu mensaje listo para enviar.' })
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <nav className="navbar" aria-label="Main navigation">
          <a href="#hero" className="logo-group" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Tapi Fresh logo" />
            <span>Tapi Fresh</span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Abrir menú">
            ☰
          </button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#services" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#results" onClick={() => setMenuOpen(false)}>Resultados</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Reseñas</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>Preguntas</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero-content">
            <h1>Restauración y limpieza que transforma cada detalle.</h1>
            <p>
              Ofrecemos soluciones de limpieza, cuidado y restauración para hogares, muebles y vehículos,
              con un enfoque visual y profesional que realza cada espacio.
            </p>
            <div className="hero-actions">
              <a href="#whatsapp" className="primary-btn" onClick={() => setMenuOpen(false)}>Solicitar cotización</a>
              <a href="#results" className="secondary-btn">Ver resultados</a>
            </div>
          </div>
          <div className="hero-media" aria-hidden="true" />
        </section>

        <section className="section" id="services">
          <div className="section-header">
            <h2>Servicios</h2>
          </div>
          <div className="services-list">
            {services.map((service) => (
              <article className="card service-card" key={service.title}>
                <img src={service.image} alt={service.title} />
                <div className="service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-benefits">
                    {service.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="results">
          <div className="section-header">
            <h2>Resultados</h2>
          </div>
          <div className="results-panel">
            <div className="result-view">
              <div className="result-image-shell">
                <button className="carousel-btn carousel-btn-left" onClick={showPrev} aria-label="Ver anterior">
                  ←
                </button>
                <button className="result-main" onClick={() => openPreview(activeIndex)} aria-label="Ampliar imagen">
                  <img src={activeImage} alt="Trabajo destacado" />
                </button>
                <button className="carousel-btn carousel-btn-right" onClick={showNext} aria-label="Ver siguiente">
                  →
                </button>
              </div>
              <div className="result-thumbs" role="list">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    className={index === activeIndex ? 'active-thumb' : ''}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Mostrar imagen ${index + 1}`}
                  >
                    <img src={image} alt={`Resultado ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* <section className="section" id="reviews">
          <div className="section-header">
            <h2>Reseñas</h2>
          </div>
          <div className="review">
            {reviews.map((review) => (
              <article className="card review-card" key={review.name}>
                <div className="rating">★★★★★</div>
                <h3>{review.name}</h3>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        </section> */}

        <section className="section" id="faq">
          <div className="section-header">
            <h2>FAQs</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div className="faq-item" key={item.question}>
                <button className="faq-question" onClick={() => setActiveFaq(index === activeFaq ? -1 : index)}>
                  <span>{item.question}</span>
                  <span>{index === activeFaq ? '−' : '+'}</span>
                </button>
                {index === activeFaq ? <div className="faq-answer">{item.answer}</div> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-header">
            <h2>Contacto</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Contáctanos</h3>
              <p>Estamos listos para ayudarte con tu próximo proyecto de limpieza, restauración y cuidado.</p>
              <div className="contact-list">
                <span><strong>Horario:</strong> Lunes a Viernes • 9:00 a 18:00</span>
                <a href={`tel:${contactPhone}`}><strong>Teléfono:</strong> +54 9 3547 45 4709</a>
                <a href={`https://wa.me/${whatsappNumber}?text=Hola%20Tapi%20Fresh`}><strong>WhatsApp:</strong> Cotizaciones rápidas y atención personalizada</a>
                <a href={`mailto:${contactEmail}`}><strong>Email:</strong> {contactEmail}</a>
                <a className="contact-email-btn" href={`mailto:${contactEmail}`} id='whatsapp'>Envíanos un correo</a>
              </div>
            </div>
            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <label className="form-field">
                <span>Tu nombre</span>
                <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder='Tu Nombre'/>
              </label>
              <label className="form-field">
                <span>Barrio</span>
                <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleFormChange} placeholder='Barrio'/>
              </label>
              <label className="form-field">
                <span>Cuéntanos qué necesitas</span>
                <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder='Quiero limpiar un colchón de dos cuerpos'/>
              </label>
              {formStatus.message ? <div className={`form-status ${formStatus.type}`}>{formStatus.message}</div> : null}
              <button type="submit">Enviar WhatsApp</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <span>© 2026 Tapi Fresh. Todos los derechos reservados.</span>
          <div className="social-links">
            <a href="https://www.instagram.com/tapifresh2026" target="_blank" rel="noreferrer">
              <img src={instagramIcon} alt="Instagram" />
            </a>
          </div>
        </div>
      </footer>

      <a className="whatsapp-float" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp">
        <img src={whatsappIcon} alt="WhatsApp" />
      </a>

      {openImage ? (
        <div className="modal-overlay" onClick={closePreview}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="close-btn" onClick={closePreview} aria-label="Cerrar vista ampliada">
              ✕
            </button>
            <img className="modal-image" src={openImage} alt="Vista ampliada" style={{ transform: `scale(${zoomLevel})` }} />
            <div className="modal-actions">
              <button onClick={zoomOut} aria-label="Alejar">−</button>
              <button onClick={zoomIn} aria-label="Acercar">+</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App