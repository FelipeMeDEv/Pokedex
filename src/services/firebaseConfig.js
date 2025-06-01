import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUW4I3BRTwnkBbtg730mQtBvbiuoUt_YU",
  authDomain: "pokedex-cd088.firebaseapp.com",
  projectId: "pokedex-cd088",
  storageBucket: "pokedex-cd088.firebasestorage.app",
  messagingSenderId: "296034703195",
  appId: "1:296034703195:web:836730c1fdff207cbf2c7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };