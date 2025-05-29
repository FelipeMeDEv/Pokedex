export async function fetchPokemonList(limit = 151) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    return [];
  }
}
