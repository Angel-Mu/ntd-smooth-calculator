import { useEffect, useState } from 'react'
import Head from 'next/head'
import router from 'next/router'
import styles from '../styles/Home.module.css'
import SessionForm from '../components/screens/SessionForm'

export default function Register() {
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
