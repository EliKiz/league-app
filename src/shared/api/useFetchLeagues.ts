import { useQuery } from '@tanstack/react-query';

export interface ApiLeague {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export const useFetchLeagues = () => {
  const { data, isLoading, isError, error } = useQuery<{ leagues: ApiLeague[] }, Error>({
    queryKey: ['leagues'],
    queryFn: async () => {
      const res = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
      if (!res.ok) throw new Error('Failed to fetch leagues');
      return res.json();
    },
    staleTime: 1000 * 60 * 10,
  });

  return {
    data: data?.leagues || [],
    loading: isLoading,
    error: isError ? error?.message || 'Unknown error' : null,
  };
}; 