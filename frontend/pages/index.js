import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home - ForsakenIdol</title>
        <meta name="description" content="An application developed by me!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {/* Eventually we'll put the Navbar <nav> element in here. */}
        <nav className={styles.navbar}>
          <p>Le Navbar Oui Oui Oui</p>
        </nav>
      </header>
      <main>
        <div className={styles.splash}>
          <h1>Forsaken Idol</h1>
          <p className={styles.emphasis}>Sample text</p>
        </div>
      </main>
    </div>
  )
}
