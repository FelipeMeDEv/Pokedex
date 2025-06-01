import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { auth } from '../services/firebaseConfig';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoadingSpinner from '../components/LoadingSpinner';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.drawerButton}>
        <Text style={styles.drawerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.drawerButton}>
        <Text style={styles.drawerText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await signOut(auth);
          navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }}
        style={styles.drawerButton}
      >
        <Text style={styles.drawerText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      setUser(userAuth);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  drawerText: {
    fontSize: 18,
  },
});
