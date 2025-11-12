import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from "expo-constants";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from "firebase/database";

// Compatibilidad para obtener 'extra' en cualquier entorno
const extra = Constants.expoConfig?.extra || Constants.manifest?.extra;

// Configuración Web de Firebase
const firebaseConfig = {
  databaseURL: extra.FIREBASE_DATABASE_URL,
  apiKey: extra.FIREBASE_API_KEY,
  authDomain: extra.FIREBASE_AUTH_DOMAIN,
  projectId: extra.FIREBASE_PROJECT_ID,
  messagingSenderId: extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: extra.FIREBASE_APP_ID,
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
//Implementacion de real time
const realtimeDB = getDatabase(app);
// Servicios
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db, realtimeDB };