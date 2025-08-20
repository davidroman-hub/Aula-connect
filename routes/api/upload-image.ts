import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const formData = await req.formData();
      const image = formData.get("image") as File;

      if (!image) {
        return new Response(
          JSON.stringify({
            success: 0,
            message: "No se proporcionó ninguna imagen",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Validar tipo de archivo
      if (!image.type.startsWith("image/")) {
        return new Response(
          JSON.stringify({
            success: 0,
            message: "El archivo debe ser una imagen",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Validar tamaño (5MB máximo)
      const maxSize = 1 * 1024 * 1024; // 5MB
      if (image.size > maxSize) {
        return new Response(
          JSON.stringify({
            success: 0,
            message: "La imagen es demasiado grande (máximo 5MB)",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2);
      const extension = image.name.split(".").pop() || "jpg";
      const fileName = `image_${timestamp}_${randomStr}.${extension}`;

      // Guardar el archivo (por ahora simulamos una URL)
      // En una implementación real, aquí subirías a un servicio como AWS S3, Cloudinary, etc.
      const imageUrl = `/static/uploads/${fileName}`;

      // Por ahora devolvemos una respuesta simulada
      // En producción, aquí harías la subida real del archivo
      return new Response(
        JSON.stringify({
          success: 1,
          file: {
            url: imageUrl,
            name: fileName,
            size: image.size,
          },
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Error uploading image:", error);
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
