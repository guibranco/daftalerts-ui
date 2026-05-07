import { format, formatDistanceToNow } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import i18n from '../i18n';

const getLocale = () => (i18n.language === 'pt' ? ptBR : enUS);

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat(i18n.language === 'pt' ? 'pt-BR' : 'en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatTimeAgo = (dateStr: string) => {
  return formatDistanceToNow(new Date(dateStr), { 
    addSuffix: true,
    locale: getLocale()
  });
};

export const formatFullDate = (dateStr: string) => {
  return format(new Date(dateStr), 'PPPp', { locale: getLocale() });
};
