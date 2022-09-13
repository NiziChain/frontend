import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'


const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>HomePage</h1>
        <h2>Linkは上にあるので、そこから飛んでね!</h2>
      </main>
      <Footer />
    </>
  )
}

export default Home
