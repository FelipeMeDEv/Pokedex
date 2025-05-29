import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DetailsScreen({ route }) {
  const { pokemonName } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do Pokémon:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [pokemonName]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pokedex</Text>
      </View>

      <View style={styles.body}>
        {loading ? (
          <LoadingSpinner />
        ) : pokemonData ? (
          <View style={styles.card}>
            <Image
              source={{ uri: pokemonData.sprites.front_default }}
              style={styles.image}
            />
            <Text style={styles.name}>{pokemonData.name.toUpperCase()}</Text>
            <Text style={styles.detail}>Altura: {pokemonData.height}</Text>
            <Text style={styles.detail}>Peso: {pokemonData.weight}</Text>
            <Text style={styles.detail}>
              Tipo(s): {pokemonData.types.map(t => t.type.name).join(', ')}
            </Text>
          </View>
        ) : (
          <Text style={styles.error}>Não foi possível carregar os dados.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#EE1C25',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginVertical: 2,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});
