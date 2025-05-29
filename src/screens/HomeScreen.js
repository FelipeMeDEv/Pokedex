import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import usePokemonList from '../hooks/usePokemonList.js';
import PokemonPicker from '../components/PokemonPicker.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

export default function HomeScreen({ navigation }) {
  const { pokemonList, selectedPokemon, setSelectedPokemon, loading } = usePokemonList();

  const goToDetails = () => {
    if (selectedPokemon) {
      navigation.navigate('Details', { pokemonName: selectedPokemon });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pokedex</Text>
      </View>

      <View style={styles.body}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <PokemonPicker
              selectedPokemon={selectedPokemon}
              onValueChange={setSelectedPokemon}
              pokemonList={pokemonList}
            />

            <TouchableOpacity style={styles.button} onPress={goToDetails}>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4da6ff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
