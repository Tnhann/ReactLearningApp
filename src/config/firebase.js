import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase yapılandırması - Firebase konsolundan alınan gerçek bilgiler
const firebaseConfig = {
  apiKey: "AIzaSyDxbAoQ4U42OMg_RO8o1TFisHqReQY3rrI",
  authDomain: "reactlearningapp-5cf88.firebaseapp.com",
  projectId: "reactlearningapp-5cf88",
  storageBucket: "reactlearningapp-5cf88.appspot.com",
  messagingSenderId: "4643381381",
  appId: "1:4643381381:web:f149ccad07a2e0c69c49ec",
  measurementId: "G-HQ76P1J22C"
};

// Firebase'i başlat
let app;
let db;
let auth;

try {
  console.log('Firebase başlatılıyor...');
  app = initializeApp(firebaseConfig);
  console.log('Firebase app başarıyla başlatıldı');

  db = getFirestore(app);
  console.log('Firestore başarıyla başlatıldı');

  auth = getAuth(app);
  console.log('Firebase Authentication başarıyla başlatıldı');
} catch (error) {
  console.error("Firebase başlatılamadı:", error);
}

export { db, auth };
export default app;
