import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const AuthContext = createContext({});

const firebaseConfig = {
  apiKey: "AIzaSyBFPJIc9kG4Ij2tZJvN5SZW3deC6L4KLAI",
  authDomain: "nextfirebase-81270.firebaseapp.com",
  projectId: "nextfirebase-81270",
  storageBucket: "nextfirebase-81270.appspot.com",
  messagingSenderId: "394015830674",
  appId: "1:394015830674:web:c48edc260b70cb0c88ac4b",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export function AuthContextProvider({ children }) {
  const [dados, setDados] = useState([]);
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Usuário logado com sucesso com o Google!");
      console.log(userCredential);
      setDados(userCredential.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleGoogleLogin,
        dados,
        setDados,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
