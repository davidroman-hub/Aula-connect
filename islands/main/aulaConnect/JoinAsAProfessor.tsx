import { palette } from "../../../assets/colors.ts";

const JoinAsAProfessor = () => {
  const testimonials = [
    {
      name: "María González",
      subject: "Profesora de Matemáticas",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      testimonial:
        "Aula Connect ha transformado mi manera de enseñar. Ahora puedo llegar a estudiantes de todo el país.",
    },
    {
      name: "Carlos Mendoza",
      subject: "Profesor de Inglés",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      testimonial:
        "Las herramientas interactivas hacen que mis clases sean más dinámicas y mis estudiantes más participativos.",
    },
    {
      name: "Laura Fernández",
      subject: "Profesora de Historia",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      testimonial:
        "La plataforma es muy intuitiva y me ha ayudado a organizar mejor mis clases.",
    },
  ];

  return (
    <section id="teachers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Únete a nuestra comunidad de profesores
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Educadores de todo el mundo ya están usando Aula Connect.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-xl overflow-hidden shadow-md transition duration-300 teacher-card"
            >
              <div
                className={`h-48 bg-[${palette.hover}] flex items-center justify-center`}
              >
                <img
                  src={testimonial.image}
                  alt={`Profesor ${testimonial.name}`}
                  className="h-32 w-32 rounded-full border-4 border-white"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
                <p className="text-indigo-600 mb-3">{testimonial.subject}</p>
                <div className="flex justify-center space-x-1 text-yellow-400 mb-3">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="text-gray-600 text-sm">
                  "{testimonial.testimonial}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            className={`inline-block bg-[${palette.primary}] hover:bg-[${palette.hover}] cursor-pointer text-white px-8 py-4 rounded-lg font-bold text-lg transition`}
          >
            Únete como profesor
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinAsAProfessor;
