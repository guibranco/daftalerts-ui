import React from 'react';
import { useTranslation } from 'react-i18next';
import { Property } from '../types/property';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bed, Bath, Home, MapPin, Eye, Trash2, CheckCircle, RefreshCcw } from 'lucide-react';
import { getBerColor } from '../lib/ber';
import { formatPrice, formatTimeAgo } from '../lib/format';
import { cn } from '../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  onApprove?: (id: string) => void;
  onRecycle?: (id: string) => void;
  onRestore?: (id: string) => void;
  view?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onApprove, 
  onRecycle, 
  onRestore,
  view = 'grid' 
}) => {
  const { t } = useTranslation();

  if (view === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow group overflow-hidden">
        <div className="flex items-center gap-4 p-2">
          <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0 bg-muted">
            <img 
              src={property.mainImageUrl || ''} 
              alt="" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate">{property.address}</h4>
            <p className="text-xs text-muted-foreground">{property.propertyType} • {property.routingKey}</p>
          </div>
          <div className="text-right flex-shrink-0 w-24">
            <div className="font-bold text-primary">{formatPrice(property.priceMonthly)}</div>
            <div className="text-[10px] text-muted-foreground">{formatTimeAgo(property.receivedAt)}</div>
          </div>
          <div className="flex gap-1">
             <Link to={`/property/${property.id}`} state={{ backgroundLocation: window.location }}>
                <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="w-4 h-4"/></Button>
             </Link>
             {property.status === 'inbox' && (
                <>
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-500" onClick={() => onRecycle?.(property.id)}><Trash2 className="w-4 h-4"/></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-green-50 hover:text-green-500" onClick={() => onApprove?.(property.id)}><CheckCircle className="w-4 h-4"/></Button>
                </>
             )}
             {property.status === 'recycled' && (
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onRestore?.(property.id)}><RefreshCcw className="w-4 h-4"/></Button>
             )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col group overflow-hidden h-full border-border/60 bg-white dark:bg-card">
      <div className="relative h-[160px] bg-muted overflow-hidden">
        {property.mainImageUrl ? (
          <img 
            src={property.mainImageUrl} 
            alt={property.address}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Home className="w-12 h-12 opacity-20" />
          </div>
        )}
        
        <Badge 
          className={cn("absolute top-3 left-3 font-extrabold text-[12px] h-6 px-2 rounded", getBerColor(property.berRating))}
        >
          {property.berRating || 'Exempt'}
        </Badge>
      </div>

      <CardContent className="p-4 flex-1">
        <div className="mb-1 text-2xl font-bold text-primary">
          {formatPrice(property.priceMonthly)}
          <span className="text-sm text-muted-foreground font-medium">/mo</span>
        </div>
        
        <h3 className="font-semibold text-sm truncate mb-3 text-foreground/90">
          {property.address}
        </h3>

        <div className="flex gap-x-4 mb-3">
          <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
            <Bed className="w-3.5 h-3.5" /> {property.beds}
          </div>
          <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
            <Bath className="w-3.5 h-3.5" /> {property.baths}
          </div>
          <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" /> {property.routingKey}
          </div>
        </div>
        
        <span className="text-xs text-muted-foreground block mb-4">
          Received {formatTimeAgo(property.receivedAt)}
        </span>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t border-border/50 flex gap-2">
        {property.status === 'inbox' ? (
          <>
            <Button 
              size="sm" 
              className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 border-none shadow-none text-xs font-bold h-10"
              onClick={() => onRecycle?.(property.id)}
            >
              Recycle
            </Button>
            <Link to={`/property/${property.id}`} state={{ backgroundLocation: window.location }} className="flex-1">
              <Button size="sm" variant="outline" className="w-full bg-gray-50 hover:bg-gray-100 border-border/40 text-xs font-bold h-10">
                View
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground border-none shadow-none text-xs font-bold h-10"
              onClick={() => onApprove?.(property.id)}
            >
              Approve
            </Button>
          </>
        ) : property.status === 'recycled' ? (
          <>
             <Button 
              size="sm" 
              variant="outline" 
              className="col-span-1"
              onClick={() => onRestore?.(property.id)}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              {t('common.restore')}
            </Button>
            <Link to={`/property/${property.id}`} state={{ backgroundLocation: window.location }} className="col-span-2">
              <Button size="sm" variant="secondary" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                {t('property.viewDetails')}
              </Button>
            </Link>
          </>
        ) : (
          <Link to={`/property/${property.id}`} state={{ backgroundLocation: window.location }} className="col-span-3">
            <Button size="sm" variant="secondary" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              {t('property.viewDetails')}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
