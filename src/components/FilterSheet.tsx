import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter,
  SheetTrigger
} from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { useFilters } from '../hooks/useFilters';
import { Filter, X } from 'lucide-react';
import { BER_LEVELS } from '../lib/ber';
import { isValidRoutingKey } from '../lib/eircode';
import { usePresets } from '../hooks/usePresets';

const DUBLIN_KEYS = [
  'D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D06W', 'D07', 'D08', 'D09',
  'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17', 'D18', 'D20',
  'D22', 'D24'
];

export function FilterSheet() {
  const { t } = useTranslation();
  const { filters, setFilters, clearFilters } = useFilters();
  const [localFilters, setLocalFilters] = React.useState(filters);
  const [customKey, setCustomKey] = React.useState('');

  const handleApply = () => {
    setFilters(localFilters);
  };

  const toggleRoutingKey = (key: string) => {
    const current = localFilters.routingKeys;
    if (current.includes(key)) {
      setLocalFilters({ ...localFilters, routingKeys: current.filter(k => k !== key) });
    } else {
      setLocalFilters({ ...localFilters, routingKeys: [...current, key] });
    }
  };

  const addCustomKey = () => {
    if (isValidRoutingKey(customKey) && !localFilters.routingKeys.includes(customKey.toUpperCase())) {
      setLocalFilters({ 
        ...localFilters, 
        routingKeys: [...localFilters.routingKeys, customKey.toUpperCase()] 
      });
      setCustomKey('');
    }
  };

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" className="gap-2" />}>
        <Filter className="w-4 h-4" />
        {t('inbox.editFilters')}
        {localFilters.routingKeys.length > 0 && (
           <Badge variant="secondary" className="ml-1 h-5 px-1 min-w-5 justify-center">
              {localFilters.routingKeys.length}
           </Badge>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto flex flex-col h-full p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{t('inbox.editFilters')}</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 p-6 space-y-8">
          {/* Routing Keys */}
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('filters.routingKeys')}</label>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="h-auto p-0"
                  onClick={() => setLocalFilters({ ...localFilters, routingKeys: DUBLIN_KEYS })}
                >
                  {t('filters.selectAll')}
                </Button>
             </div>
             <div className="flex flex-wrap gap-2">
                {DUBLIN_KEYS.map(key => (
                   <Badge 
                     key={key} 
                     variant={localFilters.routingKeys.includes(key) ? "default" : "outline"}
                     className="cursor-pointer py-1.5 px-3 rounded-md"
                     onClick={() => toggleRoutingKey(key)}
                   >
                     {key}
                   </Badge>
                ))}
             </div>
             <div className="flex gap-2">
                <Input 
                  placeholder="D## or A##" 
                  value={customKey}
                  onChange={e => setCustomKey(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCustomKey()}
                />
                <Button variant="secondary" onClick={addCustomKey}>Add</Button>
             </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
             <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('filters.priceRange')}</label>
             <div className="flex items-center gap-4">
               <Input 
                 type="number" 
                 placeholder="Min" 
                 value={localFilters.minPrice || ''}
                 onChange={e => setLocalFilters({ ...localFilters, minPrice: e.target.value ? Number(e.target.value) : null })}
               />
               <span className="text-muted-foreground">—</span>
               <Input 
                 type="number" 
                 placeholder="Max" 
                 value={localFilters.maxPrice || ''}
                 onChange={e => setLocalFilters({ ...localFilters, maxPrice: e.target.value ? Number(e.target.value) : null })}
               />
             </div>
             <Slider 
               defaultValue={[localFilters.minPrice || 500, localFilters.maxPrice || 5000]} 
               max={5000} 
               min={500} 
               step={50}
               onValueChange={(val: number | readonly number[]) => {
                if (typeof val === 'number') {
                  setLocalFilters({ ...localFilters, minPrice: val, maxPrice: null });
                } else {
                  setLocalFilters({ ...localFilters, minPrice: val[0], maxPrice: val[1] });
                }
               }}
             />
          </div>

          {/* Beds & Baths */}
          <div className="grid grid-cols-2 gap-8">
             <div className="space-y-3">
               <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('filters.beds')}</label>
               <Tabs 
                 value={localFilters.minBeds?.toString() || 'Any'} 
                 onValueChange={v => setLocalFilters({ ...localFilters, minBeds: v === 'Any' ? null : Number(v) })}
                >
                 <TabsList className="w-full">
                   <TabsTrigger value="Any" className="flex-1">Any</TabsTrigger>
                   <TabsTrigger value="1" className="flex-1">1+</TabsTrigger>
                   <TabsTrigger value="2" className="flex-1">2+</TabsTrigger>
                   <TabsTrigger value="3" className="flex-1">3+</TabsTrigger>
                 </TabsList>
               </Tabs>
             </div>
             <div className="space-y-3">
               <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('filters.baths')}</label>
               <Tabs 
                 value={localFilters.minBaths?.toString() || 'Any'} 
                 onValueChange={v => setLocalFilters({ ...localFilters, minBaths: v === 'Any' ? null : Number(v) })}
                >
                 <TabsList className="w-full">
                   <TabsTrigger value="Any" className="flex-1">Any</TabsTrigger>
                   <TabsTrigger value="1" className="flex-1">1+</TabsTrigger>
                   <TabsTrigger value="2" className="flex-1">2+</TabsTrigger>
                 </TabsList>
               </Tabs>
             </div>
          </div>

          {/* Property Types */}
          <div className="space-y-4">
             <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('filters.propType')}</label>
             <div className="grid grid-cols-2 gap-4">
                {['House', 'Apartment', 'Studio', 'Shared'].map(type => (
                   <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={type} 
                        checked={localFilters.propertyTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          const current = localFilters.propertyTypes;
                          setLocalFilters({
                            ...localFilters,
                            propertyTypes: checked ? [...current, type] : current.filter(t => t !== type)
                          });
                        }}
                      />
                      <label htmlFor={type} className="text-sm font-medium leading-none cursor-pointer">{type}</label>
                   </div>
                ))}
             </div>
          </div>

          {/* BER */}
          <div className="space-y-3">
             <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('filters.berMin')}</label>
             <Tabs 
               value={localFilters.berMin || 'Any'} 
               onValueChange={v => setLocalFilters({ ...localFilters, berMin: v })}
              >
               <TabsList className="w-full">
                 {['Any', 'C', 'B', 'A'].map(v => (
                   <TabsTrigger key={v} value={v} className="flex-1">{v === 'Any' ? 'Any' : v + '+'}</TabsTrigger>
                 ))}
               </TabsList>
             </Tabs>
          </div>
        </div>

        <SheetFooter className="p-6 border-t bg-muted/30 sticky bottom-0">
          <div className="flex w-full gap-4">
            <Button variant="outline" className="flex-1" onClick={clearFilters}>{t('filters.reset')}</Button>
            <Button className="flex-1 bg-primary hover:bg-primary-dark" onClick={handleApply}>{t('filters.apply')}</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
