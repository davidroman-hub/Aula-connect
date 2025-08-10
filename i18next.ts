import i18next from "https://deno.land/x/i18next@v21.8.1/index.js";
import i18nextMiddleware from "https://deno.land/x/i18next_http_middleware@v3.3.2/index.js";
import { eng } from "./translations/en/global.ts";
import { es } from "./translations/es/global.ts";
const DETECTION_OPTIONS = {
  order: ["localStorage"],
  caches: ["localStorage"],
};
const locale = localStorage.getItem("i18nextLng") || "en";

const fallbackLng = [locale];
i18next
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    resources: {
      en: {
        translation: eng,
      },

      es: {
        translation: es,
      },
    },
    interpolation: { escapeValue: false },
    debug: true,
    detection: DETECTION_OPTIONS,
    fallbackLng,
    preload: ["en", "es"],
    initImmediate: false,
  });

export const i18n = i18next;
export const middleware = i18nextMiddleware;
export const handle = i18nextMiddleware.handle(i18next);
