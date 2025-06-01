import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/pokeball-loader.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 100,
    height: 100,
  },
});
