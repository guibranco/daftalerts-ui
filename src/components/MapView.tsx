import React, { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, Marker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker as GoogleMarker } from '@googlemaps/markerclusterer';
import { Property } from '../types/property';
import { formatPrice } from '../lib/format';
import { Button } from './ui/button';
import { ExternalLink, Eye, Map as MapIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface MapViewProps {
  properties: Property[];
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export function MapView({ properties }: MapViewProps) {
  const { t } = useTranslation();
  const [selectedPropId, setSelectedPropId] = useState<string | null>(null);
  const selectedProp = properties.find(p => p.id === selectedPropId);

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border shadow-sm">
      {GOOGLE_MAPS_API_KEY ? (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={{ lat: 53.3498, lng: -6.2603 }}
            defaultZoom={12}
            gestureHandling={'greedy'}
            disableDefaultUI={false}
            mapId="daftalerts_map"
          >
            <Markers properties={properties} onSelect={setSelectedPropId} />
            
            {selectedProp && selectedProp.latitude && selectedProp.longitude && (
              <InfoWindow
                position={{ lat: selectedProp.latitude, lng: selectedProp.longitude }}
                onCloseClick={() => setSelectedPropId(null)}
              >
                <div className="p-1 max-w-[200px] text-foreground">
                  <div className="aspect-video mb-2 rounded overflow-hidden">
                    <img src={selectedProp.mainImageUrl || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="font-bold text-sm leading-tight mb-1">{selectedProp.address}</h4>
                  <div className="font-bold text-primary text-base mb-2">{formatPrice(selectedProp.priceMonthly)}</div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline" className="flex-1 h-8 text-[11px]">
                      <a href={selectedProp.daftUrl} target="_blank" rel="noopener noreferrer">Daft <ExternalLink className="w-3 h-3 ml-1"/></a>
                    </Button>
                    <Link to={`/property/${selectedProp.id}`} state={{ backgroundLocation: window.location }} className="flex-1">
                       <Button size="sm" className="w-full h-8 text-[11px]">{t('property.viewDetails')}</Button>
                    </Link>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      ) : (
        <div className="w-full h-full bg-muted flex flex-col items-center justify-center p-8 text-center space-y-4">
          <MapIcon className="w-12 h-12 text-muted-foreground opacity-20" />
          <p className="text-muted-foreground font-medium">Google Maps API key missing.</p>
          <code className="text-[10px] bg-background p-2 rounded border">VITE_GOOGLE_MAPS_API_KEY</code>
        </div>
      )}
    </div>
  );
}

function Markers({ properties, onSelect }: { properties: Property[], onSelect: (id: string) => void }) {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: any }>({});
  const clusterer = useRef<any>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    if (clusterer.current) {
      clusterer.current.clearMarkers();
      clusterer.current.addMarkers(Object.values(markers));
    }
  }, [markers]);

  useEffect(() => {
    if (!map || properties.length === 0 || !(window as any).google) return;
    const google = (window as any).google;
    const bounds = new google.maps.LatLngBounds();
    let hasCoords = false;
    properties.forEach(p => {
      if (p.latitude && p.longitude) {
        bounds.extend({ lat: p.latitude, lng: p.longitude });
        hasCoords = true;
      }
    });
    if (hasCoords) {
      map.fitBounds(bounds, { padding: 50 });
    }
  }, [map, properties]);

  const setMarkerRef = (id: string, marker: any) => {
    if (marker && !markers[id]) {
      setMarkers(prev => ({ ...prev, [id]: marker }));
    }
  };

  return (
    <>
      {properties.map(prop => {
        if (!prop.latitude || !prop.longitude) return null;
        return (
          <Marker
            key={prop.id}
            position={{ lat: prop.latitude, lng: prop.longitude }}
            onClick={() => onSelect(prop.id)}
            ref={m => setMarkerRef(prop.id, m)}
          />
        );
      })}
    </>
  );
}
