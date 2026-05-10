import { useState, useEffect } from 'react';

export interface Rating {
  id: string;
  score: number; // 1-5
  updatedAt: number;
}

export function useRatings(profileId?: string) {
  const storageKey = profileId ? `ogle_tv_ratings_${profileId}` : 'ogle_tv_ratings';
  
  const [ratings, setRatings] = useState<Record<string, Rating>>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(ratings));
  }, [ratings, storageKey]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setRatings(saved ? JSON.parse(saved) : {});
  }, [storageKey]);

  const setRating = (contentId: string, score: number) => {
    setRatings(prev => ({
      ...prev,
      [contentId]: {
        id: contentId,
        score,
        updatedAt: Date.now()
      }
    }));
  };

  const getRating = (contentId: string) => ratings[contentId]?.score || 0;

  return { ratings: Object.values(ratings) as Rating[], setRating, getRating };
}
