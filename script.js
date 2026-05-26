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

//cadastro/ login//
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("caixa-cadastro");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const rua = document.getElementById("rua").value.trim();
    const numeroCasa = document.getElementById("numeroCasa").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // Validações (mantive as suas regras)
    if (!/^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/.test(nome)) {
      alert("⚠️ Nome inválido. Ex.: Ana Caroline Barbosa");
      return;
    }
    if (!/^\d{11}$/.test(cpf)) {
      alert("⚠️ CPF inválido. Deve ter 11 números.");
      return;
    }
    if (senha.length < 6) {
      alert("⚠️ Senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nome, cpf, bairro, rua, numeroCasa, telefone, email,
        criadoEm: serverTimestamp()
      });

      alert("✅ Cadastro realizado!");
      window.location.href = "home.html";
    } catch (error) {
      alert("❌ Erro: " + error.message);
    }
  });

  document.getElementById("btnAcessar")?.addEventListener("click", async () => {
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;
    await signInWithEmailAndPassword(auth, email, senha);
    window.location = "perfil.html";
  });
});

