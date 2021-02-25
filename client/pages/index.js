import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [index, setIndex] = useState("");
  const [seenIndex, setSeenIndex] = useState([]);
  const [values, setValues] = useState({});
  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndex(seenIndexes.data);
  };
  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", {
      index,
    });
    setIndex("");
  };
  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Fib App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Fib app</h1>

        <div className={styles.grid}>
          <form onSubmit={handleSubmit}>
            <label>Enter your index:</label>
            <input value={index} onChange={(e) => setIndex(e.target.value)} />
            <button>Submit</button>
          </form>

          <h3>Indexes I have seen:</h3>
          {renderSeenIndexes()}

          <h3>Calculated Values:</h3>
          {renderValues()}
        </div>
      </main>

      <footer className={styles.footer}>Learning multi container app.</footer>
    </div>
  );
}
