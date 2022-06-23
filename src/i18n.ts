import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      about: "About",
      language: "Language",
      english: "English",
      french: "French",
    },
  },
  fr: {
    translation: {
      home: "Accueil",
      about: "À Propos",
      language: "Langue",
      english: "Anglais",
      french: "Français",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
