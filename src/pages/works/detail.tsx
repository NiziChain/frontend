import { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAPIData } from '@/axiosUtl'

const DetailPage: NextPage = () => {
  const router = useRouter()
  const isOriginal = router.query['isOriginal']
  const contentId = String(router.query['contentId'])
  const initialState = {
    contentId: '',
    title: '',
    description: '',
    createdAt: '',
  }
  const [contentObject, setContentObject] = useState(initialState)

  const fetchData = async (contentId: string) => {
    console.log(isOriginal)
    const path =
      isOriginal === 'true'
        ? `/originals/${contentId}`
        : `/secondaries/${contentId}`
    const response = await getAPIData(path)
    return response
  }

  useEffect(() => {
    fetchData(contentId).then((res) => {
      setContentObject(res['data'])
    })
  }, [])

  return (
    <>
      <Header />
      <Container className='min-h-screen' component='div'>
        <Container
          component='ul'
          className='mt-10 max-w-md py-8 border-zinc-300 border rounded-xl'
        >
          <Container className='text-xl text-center mb-4'>
            作品詳細 / {isOriginal === 'true' ? '1次作品' : '2次作品'}
          </Container>
          {Object.keys(contentObject).map((key) => {
            return (
              <Container className='max-w-xs'>
                {/* @ts-ignore */}
                {key} : {contentObject[key]}
              </Container>
            )
          })}
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default DetailPage
