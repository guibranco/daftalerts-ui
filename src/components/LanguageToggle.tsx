import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const setLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" title={t('common.language')} />}>
        <Globe className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[400px] overflow-y-auto">
        <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center gap-2">
          <span>🇮🇪</span> {t('common.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('pt')} className="flex items-center gap-2">
          <span>🇵🇹</span> {t('common.pt')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('es')} className="flex items-center gap-2">
          <span>🇪🇸</span> {t('common.es')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('it')} className="flex items-center gap-2">
          <span>🇮🇹</span> {t('common.it')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('fr')} className="flex items-center gap-2">
          <span>🇫🇷</span> {t('common.fr')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('de')} className="flex items-center gap-2">
          <span>🇩🇪</span> {t('common.de')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('nl')} className="flex items-center gap-2">
          <span>🇳🇱</span> {t('common.nl')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ar')} className="flex items-center gap-2">
          <span>🇸🇦</span> {t('common.ar')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('zh')} className="flex items-center gap-2">
          <span>🇹🇼</span> {t('common.zh')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ja')} className="flex items-center gap-2">
          <span>🇯🇵</span> {t('common.ja')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ru')} className="flex items-center gap-2">
          <span>🇷🇺</span> {t('common.ru')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('uk')} className="flex items-center gap-2">
          <span>🇺🇦</span> {t('common.uk')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ur')} className="flex items-center gap-2">
          <span>🇵🇰</span> {t('common.ur')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')} className="flex items-center gap-2">
          <span>🇮🇳</span> {t('common.hi')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
