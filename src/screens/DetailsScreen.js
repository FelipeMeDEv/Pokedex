import { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { pokemonName } = route.params;

  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `Detalhes de ${pokemonName}`,
    });
  }, [navigation, pokemonName]);

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

          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.backButtonText}>Escolher outro Pokémon</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.error}>Não foi possível carregar os dados.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
    textTransform: 'uppercase',
  },
  detail: {
    fontSize: 18,
    marginVertical: 2,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
  backButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4fc3f7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
