import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDx6Ru40qo8gmOoN_AtToIC-8PBRzNK0Lw",
  authDomain: "hama-pedidos.firebaseapp.com",
  projectId: "hama-pedidos",
  storageBucket: "hama-pedidos.firebasestorage.app",
  messagingSenderId: "424820143547",
  appId: "1:424820143547:web:b546e9c59dfc1eb8fe409e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
