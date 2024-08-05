import Head from 'next/head'
import router from 'next/router'
import styles from '../styles/Home.module.css'
import SessionForm from '../components/screens/SessionForm'

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smooht Calculator App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionForm purpose={"login"}></SessionForm>
    </div>
  )
}
