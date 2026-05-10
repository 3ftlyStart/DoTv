import { useState, useEffect } from 'react';

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  image: string;
  isLive?: boolean;
  addedAt?: number;
}

export function useWatchlist(profileId?: string) {
  const storageKey = profileId ? `ogle_tv_watchlist_${profileId}` : 'ogle_tv_watchlist';
  
  const [watchlist, setWatchlist] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(watchlist));
  }, [watchlist, storageKey]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setWatchlist(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  const toggleWatchlist = (item: ContentItem) => {
    setWatchlist(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, { ...item, addedAt: Date.now() }];
    });
  };

  const isInWatchlist = (id: string) => watchlist.some(item => item.id === id);

  return { watchlist, toggleWatchlist, isInWatchlist };
}
