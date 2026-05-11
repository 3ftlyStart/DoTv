/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import ContentSection from './components/ContentSection';
import LiveGuide from './components/LiveGuide';
import Features from './components/Features';
import DoDrop from './components/DoDrop';
import Footer from './components/Footer';
import MovieDetails from './components/MovieDetails';
import SettingsModal from './components/SettingsModal';
import GlobalLoading from './components/GlobalLoading';
import { RECOMMENDATIONS } from './constants';
import { useWatchlist } from './lib/useWatchlist';
import { useHistory } from './lib/useHistory';
import { useRatings } from './lib/useRatings';
import { getPersonalizedRecommendations } from './lib/recommendationEngine';

import SearchOverlay from './components/SearchOverlay';
import VideoPlayer from './components/VideoPlayer';
import { useState, useMemo, useEffect } from 'react';

export default function App() {
  const profileId = 'default';
  const { watchlist } = useWatchlist(profileId);
  const { history, addToHistory } = useHistory(profileId);
  const { ratings } = useRatings(profileId);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPiP, setIsPiP] = useState(false);

  // Simulate initial data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayContent = (item: any) => {
    setActiveVideo(item);
    setIsPiP(false);
    addToHistory(item);
    setSelectedMovie(null); // Close details when playing
  };

  const handleTogglePiP = (enabled: boolean) => {
    setIsPiP(enabled);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    setIsPiP(false);
  };

  const handleContentClick = (item: any) => {
    setSelectedMovie(item);
  };

  const personalizedRecommendations = useMemo(() => {
    return getPersonalizedRecommendations(watchlist, history, ratings);
  }, [watchlist, history, ratings]);

  const nextItem = useMemo(() => {
    if (!activeVideo) return null;
    
    // First check continue watching (history)
    const historyIndex = history.findIndex(item => item.id === activeVideo.id);
    if (historyIndex !== -1 && historyIndex < history.length - 1) {
      return history[historyIndex + 1];
    }
    
    // Then check recommendations
    const recommendations = personalizedRecommendations.length > 0 ? personalizedRecommendations : RECOMMENDATIONS;
    const recIndex = recommendations.findIndex(item => item.id === activeVideo.id);
    
    if (recIndex !== -1 && recIndex < recommendations.length - 1) {
      return recommendations[recIndex + 1];
    } else {
      // Return first recommendation if we're at the end or if not in list
      return recommendations[0].id === activeVideo.id ? recommendations[1] : recommendations[0];
    }
  }, [activeVideo, history, personalizedRecommendations]);

  return (
    <div className="min-h-screen bg-cyber-bg relative overflow-x-hidden">
      <div className="scanline" />
      <GlobalLoading isLoading={isLoading} />
      
      <Navbar 
        onSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onItemClick={handleContentClick}
      />

      <VideoPlayer
        isOpen={!!activeVideo}
        onClose={handleCloseVideo}
        videoTitle={activeVideo?.title}
        videoUrl={activeVideo?.videoUrl}
        nextItem={nextItem}
        onPlayNext={handlePlayContent}
        isPiP={isPiP}
        onTogglePiP={handleTogglePiP}
      />

      <MovieDetails 
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onPlay={handlePlayContent}
        onSelectMovie={handleContentClick}
        profileId={profileId}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      
      <main>
        <Hero 
          onPlay={handlePlayContent} 
          onDetails={handleContentClick} 
        />
        
        <Partners />
        
        <div className="relative py-12">
          {/* Subtle background glow between sections */}
          <div className="absolute top-1/2 left-0 w-full h-[800px] immersive-glow-blue pointer-events-none -translate-y-1/2 opacity-50" />
          
          {watchlist.length > 0 && (
            <ContentSection 
              title="My Watchlist" 
              items={watchlist} 
              variant="poster"
              id="watchlist"
              profileId={profileId}
              onItemClick={handleContentClick}
            />
          )}

          <ContentSection 
            id="continue-watching"
            title="Continue Watching" 
            items={history.length > 0 ? history : RECOMMENDATIONS.slice(0, 4)} 
            variant="thumbnail" 
            profileId={profileId}
            onItemClick={handleContentClick}
          />
          
          <ContentSection 
            title={history.length > 0 || watchlist.length > 0 ? "Picked for You" : "Recommended for you"} 
            items={personalizedRecommendations.length > 0 ? personalizedRecommendations : RECOMMENDATIONS} 
            variant="poster" 
            profileId={profileId}
            onItemClick={handleContentClick}
          />

          <LiveGuide />
        </div>

        <DoDrop />

        <Features />

        <section className="py-32 px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto rounded-[3.5rem] bg-[#0A0A0A] border border-white/5 p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
            
            <h2 className="text-4xl md:text-7xl font-bold font-display mb-8 relative z-10 leading-[0.9] tracking-tight">
              THE FUTURE OF<br />
              <span className="text-blue-500">ENTERTAINMENT</span>
            </h2>
            <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto relative z-10">
              Upgrade your living room with the most intuitive smart TV experience ever built.
            </p>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <button className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-blue-400 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                Find a Retailer
              </button>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black pointer-events-none">
              Powered by Do OS v4.2
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
