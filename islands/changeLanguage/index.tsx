import { useState } from "preact/hooks";
import { i18n } from "../../i18next.ts";
import { palette } from "../../assets/colors.ts";

export default function ChangeToSpanish() {
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    // { code: "fr", name: "Français", flag: "🇫🇷" },
    // { code: "de", name: "Deutsch", flag: "🇩🇪" },
    // { code: "it", name: "Italiano", flag: "🇮🇹" },
    // { code: "ja", name: "日本語", flag: "🇯🇵" },
    // { code: "zh", name: "中文", flag: "🇨🇳" },
    // { code: "ar", name: "العربية", flag: "🇸🇦" },
    // { code: "ru", name: "Русский", flag: "🇷🇺" },
    // { code: "pt", name: "Português", flag: "🇵🇹" },
  ];

  const currentLocaleLocal = localStorage.getItem("i18nextLng") || "en";

  const TranslationButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(
      currentLocaleLocal === "es" ? languages[1] : languages[0],
    );
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleDropdown = () => {
      if (isAnimating) return;
      setIsOpen(!isOpen);
    };

    const selectLanguage = () => {
      i18n.changeLanguage(handleLocale());
      localStorage.setItem("i18nextLng", handleLocale());
      window.location.href = "/";
      console.log(`changed language to ${handleLocale()}`);

      setIsAnimating(true);
      setCurrentLanguage(
        currentLocaleLocal === "es" ? languages[0] : languages[1],
      );
      setIsOpen(false);

      // Simulate translation process
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    };

    return (
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          style={{ backgroundColor: `${palette.primary}` }}
          className={`flex items-center justify-between px-4 py-2 rounded-full shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ${
            isAnimating ? "animate-pulse" : ""
          }`}
        >
          <span className="flex items-center">
            <span className="mr-2 text-lg">{currentLanguage.flag}</span>
            {/* {currentLanguage.name} */}
          </span>
          <svg
            className={`ml-2 -mr-1 h-4 w-4 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="origin-top-right absolute mr-10px mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              <div className="px-4 py-2 text-xs text-gray-500 border-b">
                Select Language
              </div>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => selectLanguage()}
                  className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 language-item ${
                    currentLanguage.code === language.code
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                >
                  <span className="mr-3 text-lg">{language.flag}</span>
                  {language.name}
                  {currentLanguage.code === language.code && (
                    <span className="ml-auto">
                      <svg
                        className="h-4 w-4 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

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

  const currentSection = localStorage.getItem("section") || "home";

  return (
    <div className="">
      <TranslationButton />
    </div>
  );
}
