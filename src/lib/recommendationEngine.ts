import { RECOMMENDATIONS } from '../constants';
import { ContentItem } from './useWatchlist';
import { Rating } from './useRatings';

interface ScoredItem extends ContentItem {
  score: number;
}

export function getPersonalizedRecommendations(
  watchlist: ContentItem[], 
  history: ContentItem[],
  ratings: Rating[]
) {
  // 1. Extract genre/category preferences
  const preferences: Record<string, number> = {};
  
  // Weight Watchlist items (2 points each)
  watchlist.forEach(item => {
    const genre = (item as any).genre || item.category;
    if (genre) preferences[genre] = (preferences[genre] || 0) + 2;
  });
  
  // Weight History items (3 points each)
  history.forEach(item => {
    const genre = (item as any).genre || item.category;
    if (genre) preferences[genre] = (preferences[genre] || 0) + 3;
  });

  // Weight Ratings (Highly positive: +5, Positive: +2, Negative: -5)
  ratings.forEach(rating => {
    const item = RECOMMENDATIONS.find(r => r.id === rating.id);
    if (!item) return;
    
    const genre = (item as any).genre || item.category;
    if (!genre) return;

    if (rating.score >= 4) {
      preferences[genre] = (preferences[genre] || 0) + 5;
    } else if (rating.score === 3) {
      preferences[genre] = (preferences[genre] || 0) + 1;
    } else if (rating.score <= 2) {
      preferences[genre] = (preferences[genre] || 0) - 10;
    }
  });

  // 2. Score all potential recommendations
  const scored: ScoredItem[] = RECOMMENDATIONS.map(item => {
    let score = 0;
    const genre = (item as any).genre || item.category;
    
    // Match against preferences
    if (genre && preferences[genre]) {
      score += preferences[genre];
    }
    
    // Bonus for newer content
    if ((item as any).year && (item as any).year >= 2022) {
      score += 2;
    }
    
    // Penalize if already in watchlist or history (to keep it fresh)
    const isInWatchlist = watchlist.some(w => w.id === item.id);
    const isInHistory = history.some(h => h.id === item.id);
    
    if (isInWatchlist) score -= 5;
    if (isInHistory) score -= 10;

    return { ...item, score };
  });

  // 3. Sort by score and return top results
  return scored
    .filter(item => !history.some(h => h.id === item.id)) // Don't recommend what's already watched
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}
