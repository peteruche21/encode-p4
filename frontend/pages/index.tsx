import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Project 4</title>
        <meta name="description" content="Encode Bootcamp Weekend Project 4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>week4</main>
    </div>
  );
};

export default Home;
