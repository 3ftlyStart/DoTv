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
import OgleDrop from './components/OgleDrop';
import Footer from './components/Footer';
import { RECOMMENDATIONS } from './constants';
import { useWatchlist } from './lib/useWatchlist';
import { useHistory } from './lib/useHistory';
import { useRatings } from './lib/useRatings';
import { getPersonalizedRecommendations } from './lib/recommendationEngine';

import { useProfiles } from './lib/useProfiles';
import ProfileSelection from './components/ProfileSelection';
import SearchOverlay from './components/SearchOverlay';
import VideoPlayer from './components/VideoPlayer';
import { useState, useMemo } from 'react';

export default function App() {
  const { profiles, activeProfile, selectProfile } = useProfiles();
  const { watchlist } = useWatchlist(activeProfile?.id);
  const { history, addToHistory } = useHistory(activeProfile?.id);
  const { ratings } = useRatings(activeProfile?.id);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  const handlePlayContent = (item: any) => {
    setActiveVideo(item);
    addToHistory(item);
  };

  const personalizedRecommendations = useMemo(() => {
    return getPersonalizedRecommendations(watchlist, history, ratings);
  }, [watchlist, history, ratings]);

  if (!activeProfile) {
    return <ProfileSelection profiles={profiles} onSelect={selectProfile} />;
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar 
        activeProfile={activeProfile} 
        onSwitchProfile={() => selectProfile(null)} 
        onSearch={() => setIsSearchOpen(true)}
      />
      
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onItemClick={handlePlayContent}
      />

      <VideoPlayer
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoTitle={activeVideo?.title}
      />
      
      <main>
        <Hero onPlay={handlePlayContent} />
        
        <Partners />
        
        <div className="relative py-12">
          {/* Subtle background glow between sections */}
          <div className="absolute top-1/2 left-0 w-full h-[800px] immersive-glow-blue pointer-events-none -translate-y-1/2 opacity-50" />
          
          {watchlist.length > 0 && (
            <ContentSection 
              title={`${activeProfile.name}'s Watchlist`} 
              items={watchlist} 
              variant="poster"
              id="watchlist"
              profileId={activeProfile.id}
              onItemClick={handlePlayContent}
            />
          )}

          <ContentSection 
            id="continue-watching"
            title="Continue Watching" 
            items={history.length > 0 ? history : RECOMMENDATIONS.slice(0, 4)} 
            variant="thumbnail" 
            profileId={activeProfile.id}
            onItemClick={handlePlayContent}
          />
          
          <ContentSection 
            title={history.length > 0 || watchlist.length > 0 ? "Picked for You" : "Recommended for you"} 
            items={personalizedRecommendations.length > 0 ? personalizedRecommendations : RECOMMENDATIONS} 
            variant="poster" 
            profileId={activeProfile.id}
            onItemClick={handlePlayContent}
          />

          <LiveGuide />
        </div>

        <OgleDrop />

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
              Powered by Ogle OS v4.2
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
