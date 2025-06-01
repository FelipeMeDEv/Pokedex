// screens/HomeScreen.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pokedex</Text>
      </View>

      {/* Body */}
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
  header: {
    backgroundColor: '#EE1C25',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#4fc3f7',
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
