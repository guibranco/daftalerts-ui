import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePresets } from '../hooks/usePresets';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Trash2, Edit, Plus, Star } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { LanguageToggle } from '../components/LanguageToggle';

export default function Settings() {
  const { t } = useTranslation();
  const { query: presetsQuery, deleteMutation } = usePresets();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{t('nav.settings')}</h1>
        <p className="text-muted-foreground">Manage your filter presets and application preferences.</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
           <h2 className="text-xl font-bold flex items-center gap-2">
             {t('settings.presets')}
           </h2>
           <Button size="sm" className="gap-2">
             <Plus className="w-4 h-4" />
             {t('settings.newPreset')}
           </Button>
        </div>

        <div className="grid gap-4">
          {presetsQuery.data?.map(preset => (
            <Card key={preset.id} className="relative overflow-hidden">
               <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                       {preset.name}
                       {preset.isDefault && (
                         <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {t('settings.default')}
                         </Badge>
                       )}
                    </CardTitle>
                    <div className="flex gap-1">
                       <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4"/></Button>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="h-8 w-8 text-destructive"
                         onClick={() => {
                           if (confirm(t('settings.deleteConfirm'))) {
                             deleteMutation.mutate(preset.id);
                           }
                         }}
                       >
                         <Trash2 className="w-4 h-4"/>
                       </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {preset.routingKeys.join(', ')} • 
                    €{preset.minPrice || 0}—€{preset.maxPrice || '∞'} • 
                    {preset.minBeds}+ beds
                  </CardDescription>
               </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.theme')}</CardTitle>
            <CardDescription>Switch between dark and light mode.</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeToggle />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.language')}</CardTitle>
            <CardDescription>Select your preferred language.</CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageToggle />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
