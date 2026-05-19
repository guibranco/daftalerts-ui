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
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          {t('common.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('pt')}>
          {t('common.pt')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('es')}>
          {t('common.es')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('it')}>
          {t('common.it')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('fr')}>
          {t('common.fr')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('de')}>
          {t('common.de')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('nl')}>
          {t('common.nl')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ar')}>
          {t('common.ar')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('zh')}>
          {t('common.zh')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ja')}>
          {t('common.ja')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ru')}>
          {t('common.ru')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('uk')}>
          {t('common.uk')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ur')}>
          {t('common.ur')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')}>
          {t('common.hi')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
