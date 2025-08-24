import { palette } from "../../../assets/colors.ts";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl font-bold mb-6">Contáctanos</h2>
            <p className="text-gray-600 mb-8">
              ¿Tienes preguntas sobre Aula Connect? Nuestro equipo está aquí
              para ayudarte.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                  <i className={`fas fa-envelope text-[${palette.primary}]`}>
                  </i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Correo electrónico</h4>
                  <p className="text-gray-600">hola@aulaconnect.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                  <i className={`fas fa-phone-alt text-[${palette.primary}]`}>
                  </i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Teléfono</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                  <i
                    className={`fas fa-map-marker-alt text-[${palette.primary}]`}
                  >
                  </i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Oficina</h4>
                  <p className="text-gray-600">
                    Calle Educación 123, Ciudad del Aprendizaje
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/aulaconnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-indigo-100 rounded-full flex items-center justify-center transition"
                >
                  <i className="fab fa-facebook-f text-gray-600 hover:text-indigo-600">
                  </i>
                </a>
                <a
                  href="https://twitter.com/aulaconnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-indigo-100 rounded-full flex items-center justify-center transition"
                >
                  <i className="fab fa-twitter text-gray-600 hover:text-indigo-600">
                  </i>
                </a>
                <a
                  href="https://instagram.com/aulaconnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-indigo-100 rounded-full flex items-center justify-center transition"
                >
                  <i className="fab fa-instagram text-gray-600 hover:text-indigo-600">
                  </i>
                </a>
                <a
                  href="https://linkedin.com/company/aulaconnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-indigo-100 rounded-full flex items-center justify-center transition"
                >
                  <i className="fab fa-linkedin-in text-gray-600 hover:text-indigo-600">
                  </i>
                </a>
                <a
                  href="https://youtube.com/aulaconnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-indigo-100 rounded-full flex items-center justify-center transition"
                >
                  <i className="fab fa-youtube text-gray-600 hover:text-indigo-600">
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
