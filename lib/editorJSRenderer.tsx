/** @jsxImportSource preact */

interface EditorBlock {
  type: string;
  data: Record<string, unknown>;
}

interface EditorData {
  blocks?: EditorBlock[];
}

// Función para renderizar contenido de EditorJS en formato de vista previa
export function renderEditorJSContent(editorData: EditorData) {
  if (!editorData?.blocks) {
    return (
      <div className="text-gray-500 italic">No hay contenido para mostrar</div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none">
      {editorData.blocks.map((block: EditorBlock, index: number) => {
        const blockKey = `${block.type}-${index}`;

        switch (block.type) {
          case "paragraph": {
            return (
              <p key={blockKey} className="mb-3">
                {(block.data.text as string) || ""}
              </p>
            );
          }

          case "header": {
            const level = (block.data.level as number) || 2;
            const headerClasses = {
              1: "text-3xl font-bold mb-4 text-gray-900",
              2: "text-2xl font-bold mb-3 text-gray-800",
              3: "text-xl font-semibold mb-3 text-gray-800",
              4: "text-lg font-semibold mb-2 text-gray-700",
              5: "text-base font-semibold mb-2 text-gray-700",
              6: "text-sm font-semibold mb-2 text-gray-600",
            }[level] || "text-lg font-semibold mb-2 text-gray-700";

            const text = (block.data.text as string) || "";

            if (level === 1) {
              return <h1 key={blockKey} className={headerClasses}>{text}</h1>;
            } else if (level === 2) {
              return <h2 key={blockKey} className={headerClasses}>{text}</h2>;
            } else if (level === 3) {
              return <h3 key={blockKey} className={headerClasses}>{text}</h3>;
            } else if (level === 4) {
              return <h4 key={blockKey} className={headerClasses}>{text}</h4>;
            } else if (level === 5) {
              return <h5 key={blockKey} className={headerClasses}>{text}</h5>;
            } else {
              return <h6 key={blockKey} className={headerClasses}>{text}</h6>;
            }
          }

          case "list": {
            const ListTag = (block.data.style as string) === "ordered"
              ? "ol"
              : "ul";
            const listClasses = (block.data.style as string) === "ordered"
              ? "list-decimal list-inside mb-4 space-y-1"
              : "list-disc list-inside mb-4 space-y-1";

            return (
              <ListTag key={blockKey} className={listClasses}>
                {(block.data.items as string[])?.map((
                  item: string,
                  itemIndex: number,
                ) => (
                  <li
                    key={`${blockKey}-item-${itemIndex}`}
                    className="text-gray-700"
                  >
                    {item}
                  </li>
                ))}
              </ListTag>
            );
          }

          case "quote": {
            return (
              <blockquote
                key={blockKey}
                className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 rounded-r"
              >
                <p className="text-gray-800 italic mb-2">
                  "{(block.data.text as string) || ""}"
                </p>
                {block.data.caption && (
                  <cite className="text-sm text-gray-600 font-medium">
                    — {block.data.caption as string}
                  </cite>
                )}
              </blockquote>
            );
          }

          case "code": {
            return (
              <pre
                key={blockKey}
                className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto"
              >
                <code>{(block.data.code as string) || ''}</code>
              </pre>
            );
          }

          case "raw": {
            return (
              <div
                key={blockKey}
                className="mb-4 p-3 border border-yellow-300 bg-yellow-50 rounded"
              >
                <div className="text-xs text-yellow-700 mb-2 font-medium">
                  HTML Personalizado:
                </div>
                <div className="text-sm bg-gray-100 p-2 rounded font-mono">
                  {(block.data.html as string) || ""}
                </div>
              </div>
            );
          }

          default: {
            return (
              <div
                key={blockKey}
                className="mb-3 p-2 bg-gray-100 rounded text-sm text-gray-600"
              >
                <strong>Tipo desconocido:</strong> {block.type}
                <pre className="mt-1 text-xs">{JSON.stringify(block.data, null, 2)}</pre>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

// Función helper para extraer texto plano del contenido
export function getPlainTextFromEditorJS(editorData: EditorData): string {
  if (!editorData?.blocks) return "";

  return editorData.blocks
    .map((block: EditorBlock) => {
      switch (block.type) {
        case "paragraph":
        case "header":
          return (block.data.text as string) || "";
        case "list":
          return (block.data.items as string[])?.join("\n") || "";
        case "quote": {
          const text = (block.data.text as string) || "";
          const caption = block.data.caption as string;
          return caption ? `"${text}" — ${caption}` : `"${text}"`;
        }
        case "code":
          return (block.data.code as string) || "";
        case "raw":
          return (block.data.html as string) || "";
        default:
          return "";
      }
    })
    .filter((text) => text.trim())
    .join("\n\n");
}
