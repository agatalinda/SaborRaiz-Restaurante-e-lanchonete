// Importa e inicializa Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsFyvefj6hTUTZJ52jDX9wa_uqWFbeQFk",
  authDomain: "atividade-b80ae.firebaseapp.com",
  projectId: "atividade-b80ae",
  storageBucket: "atividade-b80ae.firebasestorage.app",
  messagingSenderId: "341377935732",
  appId: "1:341377935732:web:959b94629a218e304da421",
  measurementId: "G-EGES8GYVE3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
