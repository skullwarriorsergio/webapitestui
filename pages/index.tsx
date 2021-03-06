import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from '../components/dashboard'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web API Test - UI</title>
        <meta name="description" content="UI for a test web api build on .Net 5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <h1 className={styles.title}>
          Welcome to a gateway handling system
      </h1>
      <Dashboard/>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
