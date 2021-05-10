import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import t_enGB from './translations/enGB.json';
import t_ptPT from './translations/ptPT.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  'pt-PT': t_ptPT,
  'en-GB': t_enGB,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en-GB",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
