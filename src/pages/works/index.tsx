import type { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { Container } from '@mui/material'
import WorksListDisplay, {
  ContentList,
} from '@/components/works/WorksListDisplay'
import { useState, useEffect } from 'react'
import { getAPIData } from '@/axiosUtl'

const Index: NextPage = () => {
  const parentList: ContentList[] = []
  const niziList: ContentList[] = []
  const [contentList, setContentList] = useState([])

  useEffect(() => {
    fetchData().then((res) => {
      const tmp = res['data']
      setContentList(tmp['contents'])
    })
  }, [])

  const fetchData = async () => {
    const response = await getAPIData('/contents')
    return response
  }


  if (contentList)
    contentList.map((content) => {
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
