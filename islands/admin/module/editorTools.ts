// Configuración de herramientas para EditorJS
// Este archivo maneja las herramientas que funcionan bien con Deno

export const editorTools = {
  // Solo herramientas básicas por ahora
  // Podemos agregar más herramientas gradualmente después de probarlas
};

// Función para cargar herramientas dinámicamente
export function loadEditorTools() {
  const tools: Record<string, unknown> = {};

  try {
    // Por ahora usamos configuración básica
    // Las herramientas externas se pueden agregar después
    console.log("EditorJS tools loaded successfully");
  } catch (error) {
    console.warn(
      "No se pudieron cargar algunas herramientas de EditorJS:",
      error,
    );
  }

  return tools;
}
