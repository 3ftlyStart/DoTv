import { useState, useEffect } from 'react';
import { UserProfile, DEFAULT_PROFILES } from '../constants';

export function useProfiles() {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('ogle_tv_profiles');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILES;
  });

  const [activeProfile, setActiveProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ogle_tv_active_profile');
    if (saved) return JSON.parse(saved);
    return null;
  });

  useEffect(() => {
    localStorage.setItem('ogle_tv_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (activeProfile) {
      localStorage.setItem('ogle_tv_active_profile', JSON.stringify(activeProfile));
    } else {
      localStorage.removeItem('ogle_tv_active_profile');
    }
  }, [activeProfile]);

  const selectProfile = (profile: UserProfile | null) => {
    setActiveProfile(profile);
  };

  return { profiles, activeProfile, selectProfile };
}
