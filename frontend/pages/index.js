import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Application</title>
        <meta name="description" content="An application developed by me!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>My Website!</h1>
        <p>Whooo this is sick</p>
      </main>
    </div>
  )
}
