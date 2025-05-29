import { View, Image, StyleSheet } from 'react-native';

export default function LoadingSpinner() {
  return (
    <View style={styles.spinnerWrapper}>
      <Image source={require('../../assets/pokeball.gif')} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 80,
    height: 80,
  },
});
