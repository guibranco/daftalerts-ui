import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import pt from './pt.json';
import es from './es.json';
import it from './it.json';
import fr from './fr.json';
import ar from './ar.json';
import zhTW from './zh-TW.json';
import ja from './ja.json';
import ru from './ru.json';
import uk from './uk.json';
import ur from './ur.json';
import de from './de.json';
import nl from './nl.json';
import hi from './hi.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
      it: { translation: it },
      fr: { translation: fr },
      ar: { translation: ar },
      zh: { translation: zhTW },
      ja: { translation: ja },
      ru: { translation: ru },
      uk: { translation: uk },
      ur: { translation: ur },
      de: { translation: de },
      nl: { translation: nl },
      hi: { translation: hi },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
