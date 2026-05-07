import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts(onSearchFocus: () => void) {
  const navigate = useNavigate();
  const [lastChar, setLastChar] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || (e.target as HTMLElement).isContentEditable) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === '/') {
        e.preventDefault();
        onSearchFocus();
        return;
      }

      if (lastChar === 'g') {
        if (key === 'i') navigate('/inbox');
        if (key === 'a') navigate('/approved');
        if (key === 'r') navigate('/recycled');
        setLastChar(null);
        return;
      }

      if (key === 'g') {
        setLastChar('g');
        // Clear after 1s if no second key
        setTimeout(() => setLastChar(null), 1000);
      } else {
        setLastChar(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, lastChar, onSearchFocus]);
}
