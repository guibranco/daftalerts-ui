import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { useMapsKey } from '../hooks/useMapsKey';
import { Key } from 'lucide-react';

export function MapsKeyModal() {
  const { t } = useTranslation();
  const { apiKey, setApiKey, isModalOpen: isOpen, setIsModalOpen: setIsOpen } = useMapsKey();
  const [inputValue, setInputValue] = useState('');

  // Close modal only if apiKey exists
  const handleSave = () => {
    if (inputValue.trim()) {
      setApiKey(inputValue.trim());
      setIsOpen(false);
    }
  };

  // Sync state if apiKey changes externally
  React.useEffect(() => {
    if (!apiKey) {
      setIsOpen(true);
    }
  }, [apiKey]);

  // Sync input when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setInputValue(apiKey || '');
    }
  }, [isOpen, apiKey]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Prevent closing if no API key
      if (apiKey) setIsOpen(open);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <Key className="w-6 h-6" />
          </div>
          <DialogTitle className="text-center text-xl">Google Maps API Key Required</DialogTitle>
          <DialogDescription className="text-center">
            To use the maps feature, you need to provide a Google Maps API key. 
            This key will be stored locally in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input 
            placeholder="AIza..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <div className="text-[11px] text-muted-foreground bg-muted p-3 rounded-md">
            <p className="font-semibold mb-1">How to get a key?</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to the <a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a>.</li>
              <li>Create a new project or select an existing one.</li>
              <li>Enable "Maps JavaScript API".</li>
              <li>Create API Key and paste it here.</li>
            </ol>
          </div>
        </div>
        <DialogFooter>
          <Button 
            className="w-full bg-primary hover:bg-primary-dark" 
            onClick={handleSave}
            disabled={!inputValue.trim()}
          >
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
