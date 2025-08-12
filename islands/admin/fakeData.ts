export const initialStudents = [
  {
    id: 1,
    name: "María Rodríguez",
    email: "maria@ejemplo.com",
    progress: 75,
    modules: [
      { id: 1, name: "Fundamentos de JS", progress: 90 },
      { id: 2, name: "React Básico", progress: 80 },
      { id: 3, name: "React Avanzado", progress: 60 },
      { id: 4, name: "Bases de Datos", progress: 70 },
    ],
  },
  {
    id: 2,
    name: "Carlos Pérez",
    email: "carlos@ejemplo.com",
    progress: 60,
    modules: [
      { id: 1, name: "Fundamentos de JS", progress: 100 },
      { id: 2, name: "React Básico", progress: 70 },
      { id: 3, name: "React Avanzado", progress: 30 },
      { id: 4, name: "Bases de Datos", progress: 40 },
    ],
  },
  {
    id: 3,
    name: "Ana Gómez",
    email: "ana@ejemplo.com",
    progress: 90,
    modules: [
      { id: 1, name: "Fundamentos de JS", progress: 100 },
      { id: 2, name: "React Básico", progress: 95 },
      { id: 3, name: "React Avanzado", progress: 85 },
      { id: 4, name: "Bases de Datos", progress: 80 },
    ],
  },
  {
    id: 4,
    name: "Jorge Martínez",
    email: "jorge@ejemplo.com",
    progress: 45,
    modules: [
      { id: 1, name: "Fundamentos de JS", progress: 70 },
      { id: 2, name: "React Básico", progress: 40 },
      { id: 3, name: "React Avanzado", progress: 30 },
      { id: 4, name: "Bases de Datos", progress: 35 },
    ],
  },
];

export const initialCourses = [
  { id: 1, name: "Desarrollo Web Full Stack", modules: 6, students: 24 },
  { id: 2, name: "React Avanzado", modules: 4, students: 18 },
  { id: 3, name: "JavaScript Profesional", modules: 5, students: 32 },
  { id: 4, name: "Node.js y Express", modules: 4, students: 15 },
];

export const initialModules = [
  { id: 1, name: "Fundamentos de JS", course: "JavaScript Profesional" },
  { id: 2, name: "React Básico", course: "React Avanzado" },
  { id: 3, name: "React Avanzado", course: "React Avanzado" },
  { id: 4, name: "Bases de Datos", course: "Desarrollo Web Full Stack" },
];
