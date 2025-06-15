import { useEffect, useState } from 'react';

export interface ApiLeague {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export const useFetchLeagues = () => {
  const [data, setData] = useState<ApiLeague[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php')
      .then(res => res.json())
      .then(json => {
        setData(json.leagues || []);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message || 'Unknown error');
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}; 