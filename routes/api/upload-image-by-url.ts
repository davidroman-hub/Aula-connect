import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.json();
      const { url } = body;

      if (!url) {
        return new Response(
          JSON.stringify({
            success: 0,
            message: "No se proporcionó ninguna URL",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Validar que sea una URL válida
      try {
        new URL(url);
      } catch {
        return new Response(
          JSON.stringify({
            success: 0,
            message: "URL no válida",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Validar que sea una imagen
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
      ];
      const isImage = imageExtensions.some((ext) =>
        url.toLowerCase().includes(ext)
      );

      if (!isImage) {
        // Intentar verificar el content-type
        try {
          const response = await fetch(url, { method: "HEAD" });
          const contentType = response.headers.get("content-type") || "";

          if (!contentType.startsWith("image/")) {
            return new Response(
              JSON.stringify({
                success: 0,
                message: "La URL no apunta a una imagen válida",
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
        } catch {
          return new Response(
            JSON.stringify({
              success: 0,
              message: "No se pudo verificar la URL",
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      }

      // Devolver la URL de la imagen
      return new Response(
        JSON.stringify({
          success: 1,
          file: {
            url: url,
            name: url.split("/").pop() || "image",
          },
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Error processing image URL:", error);
      return new Response(
        JSON.stringify({
          success: 0,
          message: "Error interno del servidor",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
