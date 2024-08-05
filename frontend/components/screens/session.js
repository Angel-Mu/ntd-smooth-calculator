import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import router from 'next/router'
import styles from '../../styles/Home.module.css'
import Input from '../form/Input'

import { apiUrl } from "../../config"


export default function SessionForm({ purpose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const url = purpose === 'register' ? `${apiUrl}/v1/register` : `${apiUrl}/v1/login`
    const user = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
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

      <h1 className={styles.title} style={{ textTransform: 'capitalize' }}>{purpose}</h1>
      <div className="container center">
        <div className="row">
          <div className="col-sm-2"></div>
          <Input type="text" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} helpertext="Must contain one lowecase, one uppercase and one number." />
          <div className="float-right">
            <Link href="/" className="btn btn-md btn-secondary">Cancel</Link>
            <button className="btn btn-md btn-primary" onClick={signIn}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  )
}
