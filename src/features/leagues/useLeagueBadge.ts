import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface BadgeData {
  strBadge: string;
  strSeason: string;
}

export const useLeagueBadge = () => {
  const [leagueId, setLeagueId] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery<{ seasons: BadgeData[] } | null, Error>({
    queryKey: ['leagueBadge', leagueId],
    queryFn: async () => {
      if (!leagueId) return null;
      const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`);
      if (!res.ok) throw new Error('Failed to fetch badge');
      return res.json();
    },
    enabled: !!leagueId,
    staleTime: 1000 * 60 * 10,
  });

  const seasons: BadgeData[] = data?.seasons || [];
  const badge = [...seasons].reverse().find((s: BadgeData) => s.strBadge)?.strBadge || null;

  const fetchBadge = (id: string) => setLeagueId(id);
  const reset = () => setLeagueId(null);

  return {
    badge,
    loading: isLoading,
    error: isError ? error?.message || 'Unknown error' : null,
    fetchBadge,
    reset,
  };
};
