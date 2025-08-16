// Utilidades para el editor de notas con formato Markdown

// Tipo genérico para formData que debe contener un campo notes
type FormDataWithNotes = {
  notes: string;
  [key: string]: string | number | string[];
};

// Función para insertar formato en el textarea
export const insertFormatting = (
  textarea: HTMLTextAreaElement | null,
  formData: FormDataWithNotes,
  setFormData: (
    updater: (prev: FormDataWithNotes) => FormDataWithNotes,
  ) => void,
  prefix: string,
  suffix: string,
  placeholder: string,
) => {
  if (!textarea) return;

  // Enfocar el textarea primero
  textarea.focus();

  const start = textarea.selectionStart || 0;
  const end = textarea.selectionEnd || 0;
  const currentValue = formData.notes; // Usar el valor del estado
  const selectedText = currentValue.substring(start, end);
  const textToInsert = selectedText || placeholder;
  const newText = prefix + textToInsert + suffix;

  const newValue = currentValue.substring(0, start) + newText +
    currentValue.substring(end);

  // Actualizar el estado
  setFormData((prev) => ({ ...prev, notes: newValue }));

  // Reposicionar el cursor después de que React actualice el DOM
  setTimeout(() => {
    textarea.focus();
    if (selectedText) {
      // Si había texto seleccionado, mantener la selección sobre el texto insertado
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + textToInsert.length,
      );
    } else {
      // Si no había texto seleccionado, posicionar el cursor después del texto insertado
      const newCursorPosition = start + prefix.length + placeholder.length;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  }, 10); // Aumentar el timeout ligeramente
};

// Función para obtener el placeholder según el formato
export const getPlaceholderText = (noteFormat: string) => {
  switch (noteFormat) {
    case "markdown":
      return `# Título del Módulo

## Objetivos de Aprendizaje
- Objetivo 1
- Objetivo 2

## Contenido Principal
Explica los conceptos principales aquí...

### Conceptos Clave
- **Concepto importante**: Explicación
- *Término específico*: Definición

## Ejemplos Prácticos
\`\`\`javascript
// Código de ejemplo
console.log("Hola mundo");
\`\`\`

## Recursos Adicionales
- [Enlace útil](https://ejemplo.com)
- [Documentación oficial](https://docs.ejemplo.com)

> **Nota importante**: Recuerda destacar información crucial

## Ejercicios Recomendados
1. Ejercicio práctico 1
2. Ejercicio práctico 2`;

    case "html":
      return `<h1>Título del Módulo</h1>

<h2>Objetivos de Aprendizaje</h2>
<ul>
  <li>Objetivo 1</li>
  <li>Objetivo 2</li>
</ul>

<h2>Contenido Principal</h2>
<p>Explica los conceptos principales aquí...</p>

<h3>Conceptos Clave</h3>
<ul>
  <li><strong>Concepto importante</strong>: Explicación</li>
  <li><em>Término específico</em>: Definición</li>
</ul>

<h2>Ejemplos Prácticos</h2>
<pre><code>// Código de ejemplo
console.log("Hola mundo");</code></pre>

<blockquote>
  <strong>Nota importante</strong>: Recuerda destacar información crucial
</blockquote>`;

    default:
      return `Contenido de la clase, explicaciones, conceptos clave...

Puedes usar:
- Títulos y subtítulos
- Listas con viñetas
- Código de ejemplo
- Enlaces a recursos
- Notas importantes`;
  }
};
