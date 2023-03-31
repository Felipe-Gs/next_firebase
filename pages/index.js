import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/src/hooks/useAuth";

export default function Home() {
  const { handleGoogleLogin, dados } = useAuth();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (dados.email) {
      router.push("/googleAuth");
    }
  }, [dados]);

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
          width: "100vw",
          height: "100vh",
          backgroundColor: "#A18AFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Head>
          <title>Login com Firebase</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className={styles.title}>Faça o login</h1>
        <div
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button
            onClick={() => handleGoogleLogin()}
            variant="outlined"
            style={{ width: "60%" }}
            type="button"
          >
            Google
          </Button>
        </div>
      </div>
    </>
  );
}
