import { i18n } from "../../i18next.ts";

export default function ChangeToSpanish() {
  const localeES = "es";
  const localeENG = "en";
  const currentLocale = localStorage.getItem("i18nextLng") || "en";

  const handleLocale = () => {
    if (currentLocale === localeES) {
      return localeENG;
    } else {
      return localeES;
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        i18n.changeLanguage(handleLocale());
        localStorage.setItem("i18nextLng", handleLocale());
        window.location.href = "/";
        console.log(`changed language to ${handleLocale()}`);
      }}
    >
      Change Title to Spanish
    </button>
  );
}
