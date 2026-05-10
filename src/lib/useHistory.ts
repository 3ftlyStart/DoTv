import { useState, useEffect } from 'react';
import { ContentItem } from './useWatchlist';

export function useHistory(profileId?: string) {
  const storageKey = profileId ? `ogle_tv_history_${profileId}` : 'ogle_tv_history';
  
  const [history, setHistory] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(history));
  }, [history, storageKey]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setHistory(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  const addToHistory = (item: ContentItem) => {
    setHistory(prev => {
      // Remove if already exists to move to top
      const filtered = prev.filter(i => i.id !== item.id);
      const newItem = { ...item, watchedAt: Date.now() };
      // Keep only last 10 items
      return [newItem, ...filtered].slice(0, 10);
    });
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return { history, addToHistory, removeFromHistory };
}
