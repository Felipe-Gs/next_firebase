import Head from "next/head";
import style from "../styles/Home.module.css";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { Button, Input } from "@mui/material";
import Carditem from "@/src/components/Carditem";
import { useAuth } from "@/src/hooks/useAuth";

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

export default function Home() {
  const [tarefa, setTarefa] = useState("");
  const [titulo, setTitulo] = useState("");
  const { dados } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const db = getFirestore(firebaseApp);
  // const userCollectionRef = collection(db, "next");
  const tasksCollectionRef = collection(db, "tasks");

  const handleAddTask = async () => {
    if (!dados.email) {
      alert("Usuário não está logado.");
      return;
    }

    const newTask = {
      description: `${tarefa}`,
      title: `${titulo}`,
      date: new Date(),
      userId: dados.uid,
    };

    try {
      await addDoc(tasksCollectionRef, newTask);
      console.log("Tarefa adicionada com sucesso!");
    } catch (e) {
      console.error("Erro ao adicionar tarefa: ", e);
    }
  };

  const buscarTasks = async () => {
    try {
      const data = await getDocs(tasksCollectionRef);
      const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTasks(tasks);
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    buscarTasks();
  }, [dados]);
  const filterData = tasks.filter((item) => item.userId === dados.uid);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div
        style={{
          backgroundColor: "#A18AFF",
          width: "100vw",
          height: "100vh",
          padding: "10px",
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "15vw",
            height: "95vh",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <p style={{ fontSize: "22px" }}>Todo List {dados.displayName}</p>
          <div
            style={{
              width: "100%",
              height: "2px",
              marginTop: "20px",
            }}
          />
        </div>
        <div
          style={{
            // backgroundColor: "grey",
            width: "100%",
            alignItems: "center",
            // justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <h2>Tarefas diarias</h2>
          <div
            style={{ width: "100%", alignItems: "center", marginTop: "30px" }}
          >
            <Input
              style={{ width: "100%" }}
              placeholder="Digite a titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            ></Input>
          </div>
          <div style={{ width: "100%" }}>
            <Input
              style={{ width: "100%" }}
              placeholder="Digite a tarefa"
              value={tarefa}
              onChange={(e) => setTarefa(e.target.value)}
            ></Input>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button onClick={() => handleAddTask()} style={{ width: "100%" }}>
              Enviar
            </Button>
          </div>
          <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
            {filterData &&
              filterData.map((item, index) => {
                return (
                  <Carditem
                    key={index}
                    titulo={item.title}
                    tarefa={item.description}
                  />
                );
              })}
          </div>
          {console.log(filterData)}
        </div>
      </div>
      {/* <h1>Felipe gomes</h1>
      <button onClick={() => adicionarTarefa(tarefa)}>add task</button>
      <button onClick={handleGoogleLogin}>Login com Google</button>
      <p>{users.uid}</p>
      <button onClick={handleAddTask}>Adicionar Tarefa</button>
      <button onClick={buscarTasks}>Buscar tasks</button> */}
      {/* {tasks &&
        tasks.map((item) => {
          return <p>{item.userId}</p>;
        })}
      {console.log(filterData)} */}
    </>
  );
}
