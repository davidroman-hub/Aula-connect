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

// Función para renderizar la vista previa con formato
export const renderFormattedNotesPreview = (notes: string) => {
  if (!notes) return null;

  // Detectar si es Markdown
  const isMarkdown = notes.includes("# ") || notes.includes("## ") ||
    notes.includes("**") || notes.includes("- ");

  if (isMarkdown) {
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
