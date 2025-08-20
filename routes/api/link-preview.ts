import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const url = new URL(req.url);
      const linkUrl = url.searchParams.get("url");

      if (!linkUrl) {
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
        new URL(linkUrl);
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

      try {
        // Obtener el contenido de la página
        const response = await fetch(linkUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();

        // Extraer metadatos básicos usando regex simple
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const descriptionMatch =
          html.match(
            /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i,
          ) ||
          html.match(
            /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i,
          );
        const imageMatch = html.match(
          /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
        );

        const title = titleMatch ? titleMatch[1].trim() : linkUrl;
        const description = descriptionMatch ? descriptionMatch[1].trim() : "";
        const image = imageMatch ? imageMatch[1].trim() : "";

        return new Response(
          JSON.stringify({
            success: 1,
            meta: {
              title,
              description,
              image: image || undefined,
              url: linkUrl,
            },
          }),
          {
            headers: { "Content-Type": "application/json" },
          },
        );
      } catch (error) {
        console.error("Error fetching link preview:", error);

        // Devolver información básica si falla la extracción
        return new Response(
          JSON.stringify({
            success: 1,
            meta: {
              title: linkUrl,
              description: "",
              url: linkUrl,
            },
          }),
          {
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    } catch (error) {
      console.error("Error in link preview:", error);
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
