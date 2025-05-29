import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../services/api';

export default function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const list = await fetchPokemonList();
      setPokemonList(list);
      if (list.length > 0) setSelectedPokemon(list[0].name);
      setLoading(false);
    }

    load();
  }, []);

  return { pokemonList, selectedPokemon, setSelectedPokemon, loading };
}