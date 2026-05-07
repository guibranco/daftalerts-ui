import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useApiConfig } from '../hooks/useApiConfig';
import { Server, ShieldCheck, Database } from 'lucide-react';
import { Badge } from './ui/badge';

export function ApiConfigModal() {
  const { config, setConfig, isMock, isModalOpen: isOpen, setIsModalOpen: setIsOpen } = useApiConfig();
  const [baseUrl, setBaseUrl] = useState(config.baseUrl || '');
  const [token, setToken] = useState(config.token || '');

  // Show modal if not configured and not explicitly using mock
  useEffect(() => {
    const hasDismissed = localStorage.getItem('daft_api_modal_dismissed');
    if (!config.baseUrl && !config.token && !hasDismissed) {
      setIsOpen(true);
    }
  }, [config]);

  // Sync inputs when modal opens
  useEffect(() => {
    if (isOpen) {
      setBaseUrl(config.baseUrl || '');
      setToken(config.token || '');
    }
  }, [isOpen, config]);

  const handleSave = () => {
    setConfig({ baseUrl: baseUrl.trim(), token: token.trim() });
    setIsOpen(false);
  };

  const handleUseMock = () => {
    localStorage.setItem('daft_api_modal_dismissed', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <Server className="w-6 h-6" />
          </div>
          <DialogTitle className="text-center text-xl tracking-tight">API Configuration</DialogTitle>
          <DialogDescription className="text-center">
            Connect your property backend or use local mock data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
              <Database className="w-3 h-3" /> Base URL
            </label>
            <Input 
              placeholder="https://api.yourdomain.com" 
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> API Token
            </label>
            <Input 
              type="password"
              placeholder="Bearer token..." 
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Badge variant="outline" className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400 border-none px-1.5 py-0">Note</Badge>
              </div>
              <p className="text-[11px] text-orange-800 dark:text-orange-300 leading-relaxed">
                If you leave these empty, the application will default to <strong>Mock Mode</strong> with sample property data for demonstration purposes.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="ghost" 
            className="flex-1 order-2 sm:order-1" 
            onClick={handleUseMock}
          >
            Use Mock Mode
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary-dark order-1 sm:order-2" 
            onClick={handleSave}
          >
            Connect API
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
