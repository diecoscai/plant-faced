export default function Footer() {
  return (
    <footer
      className="bg-primary text-white px-4 py-8 mt-16"
      aria-label="Información de la tienda"
      lang="es"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 py-8">
        {/* Contact */}
        <section
          className="mb-6 p-12 bg-white/5 rounded-lg"
          id="contact"
          aria-labelledby="contact-title"
        >
          <h4
            id="contact-title"
            className="text-xl mb-4 text-white mt-0 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-[50px] after:h-[2px] after:bg-secondary"
          >
            Contacto
          </h4>
          <ul className="list-none p-0">
            <li className="mb-3">
              <a
                href="mailto:info@plantfaced.com"
                className="text-white/80 no-underline transition-colors duration-300 hover:text-secondary"
                aria-label="Enviar correo electrónico"
              >
                info@plantfaced.com
              </a>
            </li>
            <li className="mb-3">
              <a
                href="tel:+598098123123"
                className="text-white/80 no-underline transition-colors duration-300 hover:text-secondary"
              >
                098 123 123
              </a>
            </li>
            <li className="mb-3">
              <address className="not-italic text-white/80">
                Calle Falsa 123,<br />Montevideo, Uruguay
              </address>
            </li>
          </ul>
        </section>

        {/* Quick links */}
        <section
          className="mb-6 p-12 bg-white/5 rounded-lg"
          aria-labelledby="links-title"
        >
          <h4
            id="links-title"
            className="text-xl mb-4 text-white mt-0 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-[50px] after:h-[2px] after:bg-secondary"
          >
            Enlaces Rapidos
          </h4>
          <ul className="list-none p-0">
            <li className="mb-3">
              <a
                href="#terms"
                className="text-white/80 no-underline transition-colors duration-300 hover:text-secondary"
                aria-label="Ver términos y condiciones"
              >
                Términos y Condiciones
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#privacy"
                className="text-white/80 no-underline transition-colors duration-300 hover:text-secondary"
                aria-label="Ver Políticas de privacidad"
              >
                Políticas de Privacidad
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#faq"
                className="text-white/80 no-underline transition-colors duration-300 hover:text-secondary"
                aria-label="Ver preguntas frecuentes"
              >
                Preguntas Frecuentes
              </a>
            </li>
          </ul>
        </section>

        {/* Social */}
        <section
          className="mb-6 p-12 bg-white/5 rounded-lg"
          aria-labelledby="social-title"
        >
          <h4
            id="social-title"
            className="text-xl mb-4 text-white mt-0 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-[50px] after:h-[2px] after:bg-secondary"
          >
            Siguenos
          </h4>
          <ul className="list-none p-0 flex gap-4">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline transition-colors duration-300 hover:text-secondary text-2xl"
                aria-label="Visitar Facebook"
              >
                <i className="fa-brands fa-facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline transition-colors duration-300 hover:text-secondary text-2xl"
                aria-label="Visitar Instagram"
              >
                <i className="fa-brands fa-instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline transition-colors duration-300 hover:text-secondary text-2xl"
                aria-label="Visitar Twitter"
              >
                <i className="fa-brands fa-x-twitter" />
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="text-center px-4 py-4 border-t border-white/10 mt-8 text-sm text-white/70">
        <p>&copy; 2025 Plant Faced. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
