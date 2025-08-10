const locale = localStorage.getItem("i18nextLng") || "en";

export const selectSuperProfLink = (): string => {
  return locale === "en"
    ? "https://www.superprof.com/teach-modern-and-highly-demanded-technologies-the-market-react-redux-javascript-tailwind-deno-fresh-server-rendering-and.html"
    : "https://www.superprof.mx/ing-software-con-mas-anos-experiencia-profesional-imparto-tecnologias-modernas-muy-solicitadas-mercado-react.html";
};
