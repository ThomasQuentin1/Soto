import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import resources from './public/assets/i18n/translations';


i18n
  .use(initReactI18next)
  .use(Backend)
  .init({    
    resources,
      lng:'fr',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    }
  })

export { i18n }