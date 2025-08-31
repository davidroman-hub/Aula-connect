export const renderVideoPlayer = (videoUrl: string) => {
  // Detectar el tipo de URL del video
  const isYouTube = videoUrl.includes("youtube.com") ||
    videoUrl.includes("youtu.be");
  const isVimeo = videoUrl.includes("vimeo.com");
  const videoExtensionRegex = /\.(mp4|webm|ogg|mov|avi)$/i;
  const isDirectVideo = videoExtensionRegex.exec(videoUrl);

  if (isYouTube) {
    // Convertir URL de YouTube a formato embed
    let embedUrl = videoUrl;
    if (videoUrl.includes("watch?v=")) {
      const videoId = videoUrl.split("watch?v=")[1].split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtu.be/")) {
      const videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    return (
      <iframe
        className="w-full h-64 rounded-lg"
        src={embedUrl}
        title="Video del módulo"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  } else if (isVimeo) {
    // Convertir URL de Vimeo a formato embed
    const videoId = videoUrl.split("vimeo.com/")[1].split("?")[0];
    const embedUrl = `https://player.vimeo.com/video/${videoId}`;

    return (
      <iframe
        className="w-full h-64 rounded-lg"
        src={embedUrl}
        title="Video del módulo"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  } else if (isDirectVideo) {
    // Video directo (MP4, WebM, etc.)
    return (
      <video
        className="w-full h-64 rounded-lg bg-black"
        controls
        preload="metadata"
      >
        <source src={videoUrl} type={`video/${videoUrl.split(".").pop()}`} />
        <track
          kind="captions"
          src=""
          label="Sin subtítulos disponibles"
          default
        />
        Tu navegador no soporta la reproducción de video.
      </video>
    );
  } else {
    // URL desconocida, intentar como iframe genérico
    return (
      <div className="w-full h-64 rounded-lg bg-gray-100 flex flex-col items-center justify-center">
        <i className="fas fa-exclamation-triangle text-yellow-500 text-3xl mb-2">
        </i>
        <p className="text-gray-600 text-sm text-center mb-4">
          No se puede reproducir este tipo de video
        </p>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <i className="fas fa-external-link-alt mr-2"></i>{" "}
          Abrir en nueva pestaña
        </a>
      </div>
    );
  }
};
