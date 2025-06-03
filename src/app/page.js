import Image from "next/image";
import styles from "./page.module.css";
import Nav from '../components/navbar/navbar';

export default function Home() {
  return (
    <div className={styles.page}>
        <Nav/>
      <main className={styles.main}>
        

      </main>
      <footer className={styles.footer}>
          (c) Copy right 2025. Tenanz Houses
      </footer>
    </div>
  );
}
