import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function PokemonPicker({ selectedPokemon, onValueChange, pokemonList }) {
  return (
    <View style={styles.pickerWrapper}>
      <Picker selectedValue={selectedPokemon} onValueChange={onValueChange} style={styles.picker}>
        {pokemonList.map((p) => (
          <Picker.Item key={p.name} label={p.name.toUpperCase()} value={p.name} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
  },
});
