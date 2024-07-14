import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const apiKey = "cm9l2S6kuotXmRRPvFCVyg";
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug:true,

    fallbackLng: "en",

    ns: ["default"],
    defaultNS: "default",

    // supportedLngs: ["en", "es"],  Only English and Spanish for now
    supportedLngs: ["en","fr","es","hi","pt","zh","default"],
    
    backend: {
      // loadPath: loadPath
      loadPath: '/translations/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
    // react: {
    //   useSuspense: false,
    // },
  })

export default i18n;