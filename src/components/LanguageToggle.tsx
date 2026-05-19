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
      <DropdownMenuContent align="end">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
