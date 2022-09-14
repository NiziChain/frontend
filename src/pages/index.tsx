import type { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { Container } from '@mui/material'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Container className='min-h-screen'>
        <h1>HomePage</h1>
        <h2>Linkは上にあるので、そこから飛んでね!</h2>
      </Container>
      <Footer />
    </>
  )
}

export default Home
