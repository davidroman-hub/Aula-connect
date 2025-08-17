// Componente para renderizar notas con formato

// Función para renderizar formato inline
const renderInlineFormatting = (text: string) => {
  if (!text.includes("**") && !text.includes("*") && !text.includes("`")) {
    return text;
  }

  const parts = [];
  const segments = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/);

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (segment.startsWith("**") && segment.endsWith("**")) {
      const content = segment.slice(2, -2);
      parts.push(
        <strong
          key={`bold-${content.slice(0, 8)}-${i}`}
          className="font-semibold"
        >
          {content}
        </strong>,
      );
    } else if (
      segment.startsWith("*") && segment.endsWith("*") &&
      !segment.startsWith("**")
    ) {
      const content = segment.slice(1, -1);
      parts.push(
        <em key={`italic-${content.slice(0, 8)}-${i}`} className="italic">
          {content}
        </em>,
      );
    } else if (segment.startsWith("`") && segment.endsWith("`")) {
      const content = segment.slice(1, -1);
      parts.push(
        <code
          key={`code-${content.slice(0, 8)}-${i}`}
          className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
        >
          {content}
        </code>,
      );
    } else if (segment) {
      parts.push(segment);
    }
  }

  return parts.length > 1 ? parts : text;
};

// Función para renderizar HTML inline de manera segura
const renderInlineHTML = (text: string) => {
  if (!text) return text;

  const parts = [];
  // Dividir por tags HTML básicos
  const segments = text.split(/(<\/?(?:strong|b|em|i|code|span)(?:\s[^>]*)?>)/);

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (segment === "<strong>" || segment === "<b>") {
      // Buscar el contenido hasta el tag de cierre
      let content = "";
      let j = i + 1;
      while (j < segments.length && !segments[j].match(/<\/(strong|b)>/)) {
        content += segments[j];
        j++;
      }
      if (j < segments.length) {
        parts.push(
          <strong key={`strong-${i}`} className="font-semibold">
            {content}
          </strong>,
        );
        i = j; // Skip processed segments
      } else {
        parts.push(segment);
      }
    } else if (segment === "<em>" || segment === "<i>") {
      let content = "";
      let j = i + 1;
      while (j < segments.length && !segments[j].match(/<\/(em|i)>/)) {
        content += segments[j];
        j++;
      }
      if (j < segments.length) {
        parts.push(
          <em key={`em-${i}`} className="italic">
            {content}
          </em>,
        );
        i = j;
      } else {
        parts.push(segment);
      }
    } else if (segment === "<code>") {
      let content = "";
      let j = i + 1;
      while (j < segments.length && segments[j] !== "</code>") {
        content += segments[j];
        j++;
      }
      if (j < segments.length) {
        parts.push(
          <code
            key={`code-${i}`}
            className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
          >
            {content}
          </code>,
        );
        i = j;
      } else {
        parts.push(segment);
      }
    } else if (!segment.match(/<\/?(?:strong|b|em|i|code|span)>/)) {
      // Solo agregar si no es un tag de cierre
      parts.push(segment);
    }
  }

  return parts.length > 1 ? parts : text;
};

// Función para renderizar la vista previa con formato
export const renderFormattedNotesPreview = (
  notes: string,
  format = "markdown",
) => {
  if (!notes) return null;

  // Si es HTML, crear elementos de manera segura
  if (format === "html") {
    return (
      <div className="space-y-2">
        {notes.split("\n").map((line, index) => {
          if (!line.trim()) return <br key={`br-${index}`} />;

          // Parsear tags HTML básicos de manera segura
          if (line.includes("<h1>") && line.includes("</h1>")) {
            const content = line.replace(/<\/?h1>/g, "");
            return (
              <h1
                key={`h1-${index}`}
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                {content}
              </h1>
            );
          }
          if (line.includes("<h2>") && line.includes("</h2>")) {
            const content = line.replace(/<\/?h2>/g, "");
            return (
              <h2
                key={`h2-${index}`}
                className="text-xl font-semibold text-gray-800 mb-2"
              >
                {content}
              </h2>
            );
          }
          if (line.includes("<h3>") && line.includes("</h3>")) {
            const content = line.replace(/<\/?h3>/g, "");
            return (
              <h3
                key={`h3-${index}`}
                className="text-lg font-medium text-gray-700 mb-1"
              >
                {content}
              </h3>
            );
          }
          if (line.includes("<p>") && line.includes("</p>")) {
            const content = line.replace(/<\/?p>/g, "");
            return (
              <p key={`p-${index}`} className="text-gray-700 mb-2">
                {renderInlineHTML(content)}
              </p>
            );
          }
          if (line.includes("<ul>") || line.includes("</ul>")) {
            return null; // Skip ul tags, handle li directly
          }
          if (line.includes("<li>") && line.includes("</li>")) {
            const content = line.replace(/<\/?li>/g, "").trim();
            return (
              <div key={`li-${index}`} className="flex items-start ml-4 mb-1">
                <span className="text-gray-500 mr-2">•</span>
                <span className="text-gray-700">
                  {renderInlineHTML(content)}
                </span>
              </div>
            );
          }
          if (line.includes("<div>") && line.includes("</div>")) {
            const content = line.replace(/<\/?div>/g, "");
            return (
              <div key={`div-${index}`} className="text-gray-700 mb-2">
                {renderInlineHTML(content)}
              </div>
            );
          }

          // Si no tiene tags HTML, renderizar como texto normal
          return (
            <div key={`text-${index}`} className="text-gray-700 mb-1">
              {renderInlineHTML(line)}
            </div>
          );
        })}
      </div>
    );
  }

  // Detectar si es Markdown
  const isMarkdown = notes.includes("# ") || notes.includes("## ") ||
    notes.includes("**") || notes.includes("- ");

  if (isMarkdown || format === "markdown") {
    return (
      <div className="space-y-3">
        {notes.split("\n").map((line, lineIndex) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) {
            return (
              <div key={`empty-${lineIndex}-${line.length}`} className="h-2">
              </div>
            );
          }

          if (trimmedLine.startsWith("# ")) {
            return (
              <h1
                key={`h1-${trimmedLine.slice(0, 10)}-${lineIndex}`}
                className="text-xl font-bold mb-2 text-gray-900"
              >
                {trimmedLine.replace("# ", "")}
              </h1>
            );
          }
          if (trimmedLine.startsWith("## ")) {
            return (
              <h2
                key={`h2-${trimmedLine.slice(0, 10)}-${lineIndex}`}
                className="text-lg font-semibold mb-2 text-gray-800"
              >
                {trimmedLine.replace("## ", "")}
              </h2>
            );
          }
          if (trimmedLine.startsWith("### ")) {
            return (
              <h3
                key={`h3-${trimmedLine.slice(0, 10)}-${lineIndex}`}
                className="text-base font-medium mb-1 text-gray-700"
              >
                {trimmedLine.replace("### ", "")}
              </h3>
            );
          }
          if (trimmedLine.startsWith("- ")) {
            return (
              <div
                key={`list-${trimmedLine.slice(0, 10)}-${lineIndex}`}
                className="flex items-start ml-3"
              >
                <span className="text-gray-500 mr-2 text-sm">•</span>
                <span className="text-gray-700 text-sm">
                  {renderInlineFormatting(trimmedLine.replace("- ", ""))}
                </span>
              </div>
            );
          }
          if (trimmedLine.startsWith("> ")) {
            return (
              <blockquote
                key={`quote-${trimmedLine.slice(0, 10)}-${lineIndex}`}
                className="border-l-3 border-blue-400 pl-3 italic text-gray-600 bg-blue-50 py-1 rounded-r text-sm"
              >
                {trimmedLine.replace("> ", "")}
              </blockquote>
            );
          }
          if (trimmedLine.startsWith("```") || trimmedLine.endsWith("```")) {
            return (
              <pre
                key={`code-${trimmedLine.slice(0, 10)}-${lineIndex}`}
                className="bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto border"
              >
                <code>{trimmedLine.replace(/```\w*/g, '')}</code>
              </pre>
            );
          }

          return (
            <div
              key={`text-${trimmedLine.slice(0, 10)}-${lineIndex}`}
              className="text-gray-700 text-sm leading-relaxed"
            >
              {renderInlineFormatting(trimmedLine)}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="whitespace-pre-wrap text-gray-700 text-sm">
        {notes}
      </div>
    );
  }
};
