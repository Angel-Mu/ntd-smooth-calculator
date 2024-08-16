import Link from 'next/link'
import Head from 'next/head'
import router from 'next/router'
import styles from '../../styles/Home.module.css'
import { useState } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import Input from '../form/Input'
import request from '../../utils/request'
import { apiUrl } from '../../config'

export default function SessionForm({ purpose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();

  const submitRequest = (url, body) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    return request(url, options, body).catch(alert)
  }

  const handleRegister = async () => {
    const url = `${apiUrl}/register`;
    const user = await submitRequest(url, { username, password });
    if (user) {
      setTimeout(() => router.push('/'), 500);
    }
  }

  const handleLogin = async () => {
    const url = `${apiUrl}/login`;
    const response = await submitRequest(url, { username, password }).catch(alert) || {};
    const { user, token } = response;
    // console.log(user)

    if (user) {
      signIn({
        auth: {
          token: token,
          type: 'Bearer',
        },
        userState: { username: user.username, status: user.status, balance: (user.balance_cents / 100) },
      });
      localStorage.setItem('_authHeader', `Bearer ${token}`);
      localStorage.setItem('_authUser', JSON.stringify(user));
      setTimeout(() => router.push('/calculator'), 500);
    }
  }

  const handleSubmit = () => {
    if (purpose === 'login') {
      return handleLogin();
    } else if (purpose === 'register') {
      return handleRegister();
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
            <button className="btn btn-md btn-primary" onClick={handleSubmit}>{purpose}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
