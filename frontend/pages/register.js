import { useEffect, useState } from 'react'
import Head from 'next/head'
import router from 'next/router'
import styles from '../styles/Home.module.css'
import SessionForm from '../components/screens/session'

import { apiUrl } from "../config"


export default function Register({ purpose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const user = await fetch(`${apiUrl}/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .catch(err => {
        alert("Something whent wrong");
      });

    if (user) {
      setTimeout(() => {
        router.push('/')
      }, 500);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Smooht Calculator App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionForm purpose={"register"}></SessionForm>
    </div>
  )
}
