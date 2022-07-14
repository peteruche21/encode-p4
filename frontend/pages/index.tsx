import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import BlockchainData from "../components/blockchainData";
import Store from "../components/store";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Project 4</title>
        <meta name="description" content="Encode Bootcamp Weekend Project 4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="space-y-5">
          <BlockchainData />
          <Store />
        </div>
      </main>
    </div>
  );
};

export default Home;
