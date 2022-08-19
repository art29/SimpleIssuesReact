import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/EN.json";
import translationFR from "./locales/FR.json";

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

const defaultLang: string = localStorage.getItem("defaultLang") ?? "en";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: defaultLang,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
