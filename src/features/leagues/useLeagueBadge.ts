import { useState } from 'react';

interface BadgeData {
  strBadge: string;
  strSeason: string;
}

export const useLeagueBadge = () => {
  const [badge, setBadge] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBadge = async (leagueId: string) => {
    setLoading(true);
    setError(null);
    setBadge(null);
    try {
      const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`);
      const json = await res.json();
      const seasons = json.seasons || [];
      // Берём последний badge, если есть
      const last = seasons.reverse().find((s: BadgeData) => s.strBadge);
      setBadge(last?.strBadge || null);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setBadge(null);
    setError(null);
    setLoading(false);
  };

  return { badge, loading, error, fetchBadge, reset };
}; 