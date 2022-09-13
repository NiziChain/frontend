import type { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { Container } from '@mui/material'
import WorksListDisplay, { ContentList } from '@/components/works/WorksListDisplay'


const Index: NextPage = () => {
  // responseを実際に撮ってきたやつに変える
  const response = {
    contents: [
      {
        isOriginal: true,
        title: 'ドラえもん',
        description: '作品ドラえもん',
        createdAt: '2022.09.30',
        contentId: '10'
      },
      {
        isOriginal: true,
        title: 'クレヨンしんちゃん',
        description: '作品クレヨンしんちゃん',
        createdAt: '2001.08.30',
        contentId: '8'
      },
      {
        isOriginal: false,
        title: 'ドラえもん戦記',
        description: 'ドラえもんを元に作成した2次作品',
        createdAt: '2022.10.30',
        contentId: '12'
      },
    ],
  }

  const parentList: ContentList[] = []
  const niziList: ContentList[] = []

  response['contents'].map((content) => {
    content['isOriginal'] ? parentList.push(content) : niziList.push(content)
  })

  return (
    <>
      <Header />
      <Container component='div' className='min-h-screen mt-14'>
        <Container>
          <Container component='h1' className='text-center font-bold text-xl'>
            作品一覧
          </Container>
          <WorksListDisplay title='1次作品' array={parentList} />
          <WorksListDisplay title='2次作品' array={niziList} />
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default Index
