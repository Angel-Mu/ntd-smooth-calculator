import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smooht Calculator App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Smooth Calculator!</a>
        </h1>

        <p className={styles.description}>
          Please <Link href="/register" className="text-primary">Register</Link> or <Link href="/login" className="text-success">Login</Link>
        </p>
      </main>

    </div>
  );
}
