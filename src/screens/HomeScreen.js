import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import usePokemonList from '../hooks/usePokemonList';
import PokemonPicker from '../components/PokemonPicker';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomeScreen({ navigation }) {
  const { pokemonList, selectedPokemon, setSelectedPokemon, loading } = usePokemonList();

  const handleDetails = () => {
    if (selectedPokemon) {
      navigation.navigate('Details', { pokemonName: selectedPokemon });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Text style={styles.title}>Escolha seu Pokémon</Text>

            <PokemonPicker
              selectedPokemon={selectedPokemon}
              onValueChange={setSelectedPokemon}
              pokemonList={pokemonList}
            />

            <TouchableOpacity style={styles.button} onPress={handleDetails}>
              <Text style={styles.buttonText}>Detalhes</Text>
            </TouchableOpacity>
          </>
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4fc3f7',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
