import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useProperty, usePropertyMutations } from '../hooks/useProperties';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Bed, 
  Bath, 
  Home, 
  MapPin, 
  ExternalLink, 
  Clipboard, 
  Calendar,
  CheckCircle,
  Trash2,
  RefreshCcw,
  Check
} from 'lucide-react';
import { getBerColor } from '../lib/ber';
import { formatPrice, formatFullDate } from '../lib/format';
import { Textarea } from './ui/textarea';
import { Skeleton } from './ui/skeleton';
import { toast } from 'sonner';
import { Map, Marker } from '@vis.gl/react-google-maps';

export function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: property, isLoading } = useProperty(id!);
  const { updateMutation, bulkMutation } = usePropertyMutations();
  const [notes, setNotes] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (property) {
      setNotes(property.notes || '');
    }
  }, [property]);

  const handleNotesBlur = () => {
    if (property && notes !== property.notes) {
      updateMutation.mutate({ id: property.id, data: { notes } });
      toast.success(t('property.saved'));
    }
  };

  const copyEircode = () => {
    if (property?.eircode) {
      navigator.clipboard.writeText(property.eircode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success(t('property.copyEircode'));
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) navigate(-1);
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-none shadow-2xl">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : property ? (
          <div className="flex flex-col">
            <div className="relative aspect-video md:aspect-[21/9] bg-muted w-full">
              <img 
                src={property.mainImageUrl || ''} 
                className="w-full h-full object-cover"
                alt=""
                referrerPolicy="no-referrer"
              />
              <Badge 
                className={`absolute top-4 left-4 text-sm px-3 py-1 font-bold ${getBerColor(property.berRating)}`}
              >
                {t('property.ber')}: {property.berRating || 'Exempt'}
              </Badge>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                   <div className="flex items-center gap-2 text-primary font-bold text-2xl mb-1">
                      {formatPrice(property.priceMonthly)}
                      <span className="text-sm text-muted-foreground font-normal">/mo</span>
                   </div>
                   <h2 className="text-xl font-bold tracking-tight">{property.address}</h2>
                </div>

                <div className="flex flex-wrap gap-4 py-2 border-y">
                   <div className="flex items-center gap-2">
                     <Bed className="w-5 h-5 text-muted-foreground" />
                     <span className="font-semibold">{property.beds}</span>
                     <span className="text-muted-foreground text-sm">{t('property.beds')}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Bath className="w-5 h-5 text-muted-foreground" />
                     <span className="font-semibold">{property.baths}</span>
                     <span className="text-muted-foreground text-sm">{t('property.baths')}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Home className="w-5 h-5 text-muted-foreground" />
                     <span className="font-semibold">{property.propertyType}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <MapPin className="w-5 h-5 text-muted-foreground" />
                     <span className="font-semibold">{property.routingKey}</span>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {t('property.received', { time: formatFullDate(property.receivedAt) })}
                    </h3>
                  </div>
                  
                  {property.eircode && (
                    <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
                      <span className="text-sm font-mono text-muted-foreground">Eircode:</span>
                      <span className="font-bold font-mono">{property.eircode}</span>
                      <Button variant="ghost" size="sm" onClick={copyEircode} className="ml-auto">
                        {isCopied ? <Check className="w-4 h-4 text-green-500"/> : <Clipboard className="w-4 h-4"/>}
                      </Button>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">{t('property.notes')}</label>
                    <Textarea 
                      placeholder={t('property.notesPlaceholder')}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      onBlur={handleNotesBlur}
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-48 bg-muted rounded-xl overflow-hidden border relative">
                  {property.latitude && property.longitude ? (
                    <Map
                      defaultCenter={{ lat: property.latitude, lng: property.longitude }}
                      defaultZoom={13}
                      gestureHandling={'greedy'}
                      disableDefaultUI={true}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <Marker position={{ lat: property.latitude, lng: property.longitude }} />
                    </Map>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center italic text-muted-foreground text-sm p-4 text-center">
                      Map coordinates not available
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    render={<a href={property.daftUrl} target="_blank" rel="noopener noreferrer" />} 
                    className="w-full bg-primary hover:bg-primary-dark shadow-sm py-6 rounded-xl font-bold"
                  >
                    <ExternalLink className="w-5 h-5 mr-3" />
                    {t('property.openOnDaft')}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    {property.status === 'inbox' && (
                      <>
                        <Button 
                          variant="outline" 
                          className="text-destructive border-red-200"
                          onClick={() => bulkMutation.mutate({ ids: [property.id], action: 'recycle' })}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {t('common.recycle')}
                        </Button>
                        <Button 
                          className="bg-accent hover:bg-accent-dark text-white"
                          onClick={() => bulkMutation.mutate({ ids: [property.id], action: 'approve' })}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {t('common.approve')}
                        </Button>
                      </>
                    )}
                    {property.status === 'recycled' && (
                      <Button 
                        variant="outline" 
                        className="col-span-2"
                        onClick={() => bulkMutation.mutate({ ids: [property.id], action: 'restore' })}
                      >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        {t('common.restore')}
                      </Button>
                    )}
                    {property.status === 'approved' && (
                      <Button 
                        variant="outline" 
                        className="col-span-2 text-destructive border-red-200"
                        onClick={() => bulkMutation.mutate({ ids: [property.id], action: 'recycle' })}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t('common.recycle')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
