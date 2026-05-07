import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePresets } from '../hooks/usePresets';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Trash2, Edit, Plus, Star } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { LanguageToggle } from '../components/LanguageToggle';
import { useMapsKey } from '../hooks/useMapsKey';
import { useApiConfig } from '../hooks/useApiConfig';
import { Key, Server, Database, ShieldCheck } from 'lucide-react';

export default function Settings() {
  const { t } = useTranslation();
  const { query: presetsQuery, deleteMutation } = usePresets();
  const { apiKey, clearApiKey, setIsModalOpen: setMapsModalOpen } = useMapsKey();
  const { config, clearConfig, isMock, setIsModalOpen: setApiModalOpen } = useApiConfig();

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

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Keys
            </CardTitle>
            <CardDescription>
              Manage external service keys used by the application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Maps Key */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="space-y-1">
                <p className="font-medium">Google Maps API Key</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {apiKey ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}` : 'No key set'}
                </p>
              </div>
              <div className="flex gap-2">
                 <Button 
                   variant="outline" 
                   size="sm"
                   onClick={() => setMapsModalOpen(true)}
                 >
                   Reconfigure
                 </Button>
                 {apiKey && (
                   <Button 
                     variant="destructive" 
                     size="sm" 
                     onClick={() => {
                        if (confirm('Are you sure you want to clear the Google Maps API Key? The map feature will stop working.')) {
                          clearApiKey();
                        }
                     }}
                   >
                     Clear
                   </Button>
                 )}
              </div>
            </div>

            {/* Daft API Config */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="space-y-1">
                <p className="font-medium flex items-center gap-2">
                   Daft Alerts API
                   {isMock && <Badge variant="secondary" className="font-normal">Mock Mode</Badge>}
                </p>
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p className="flex items-center gap-1"><Database className="w-3 h-3"/> {config.baseUrl || 'Using mock base URL'}</p>
                  <p className="flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> {config.token ? '••••••••••••' : 'Using mock token'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <Button 
                   variant="outline" 
                   size="sm"
                   onClick={() => setApiModalOpen(true)}
                 >
                   Reconfigure
                 </Button>
                 {!isMock && (
                   <Button 
                     variant="destructive" 
                     size="sm" 
                     onClick={() => {
                        if (confirm('Are you sure you want to clear the API configuration? The app will fallback to mock data.')) {
                          clearConfig();
                        }
                     }}
                   >
                     Clear
                   </Button>
                 )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
