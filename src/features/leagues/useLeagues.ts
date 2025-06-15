import { useMemo, useState } from 'react';
import { useFetchLeagues } from '../../shared/api/useFetchLeagues';
import type { ApiLeague } from '../../shared/api/useFetchLeagues';
import { useDebounce } from '../../shared/lib/useDebounce';

export interface League {
  id: string;
  name: string;
  sport: string;
  alternate: string;
}

const mapApiLeague = (l: ApiLeague): League => ({
  id: l.idLeague,
  name: l.strLeague,
  sport: l.strSport,
  alternate: l.strLeagueAlternate,
});

const ALL_SPORTS = 'All sports';

export const useLeagues = () => {
  const { data, loading, error } = useFetchLeagues();
  const leagues = useMemo(() => data.map(mapApiLeague), [data]);
  const sports = useMemo(() => [ALL_SPORTS, ...Array.from(new Set(leagues.map(l => l.sport)))], [leagues]);
  const [filter, setFilter] = useState<{ query: string; sport: string }>({ query: '', sport: ALL_SPORTS });
  const debouncedQuery = useDebounce(filter.query, 400);

  const filteredLeagues = useMemo(() => {
    const isDefault = filter.sport === ALL_SPORTS && !debouncedQuery.trim();
    if (isDefault) return [];
    return leagues.filter(l =>
      l.name.toLowerCase().includes(debouncedQuery.toLowerCase()) &&
      (filter.sport === ALL_SPORTS || l.sport === filter.sport)
    );
  }, [leagues, filter.sport, debouncedQuery]);

  return {
    leagues,
    sports,
    filter,
    setFilter,
    filteredLeagues,
    loading,
    error,
  };
}; 