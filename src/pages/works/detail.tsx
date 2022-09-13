import { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { Container } from '@mui/material'

const DetailPage: NextPage = () => {
  return (
    <>
      <Header />
      <Container className='min-h-screen' component='div'>
        <Container
          component='ul'
          className='mt-10 max-w-md py-8 border-zinc-300 border rounded-xl'
        >
          <Container component='li'>作品名：{}</Container>
          <Container component='li'>情報：{}</Container>
          <Container component='li'>作成日：{}</Container>
          <Container component='li'>作品名：{}</Container>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default DetailPage
