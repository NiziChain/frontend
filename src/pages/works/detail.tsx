import { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { getAPIData } from '@/axiosUtl'
import { ContractContext } from '../_app'
import { ContentList } from '@/components/works/WorksListDisplay'

const DetailPage: NextPage = () => {
  const router = useRouter()
  const isOriginal = router.query['isOriginal']
  const contentId = String(router.query['contentId'])
  const [contentObject, setContentObject] = useState<ContentList | null>(null)
  const [royalty, setRoyalty] = useState(0)
  const contract = useContext(ContractContext)

  useEffect(() => {
    fetchData(contentId).then((res) => {
      setContentObject(res['data'])
    })
    getRoyalty(contentId)
  }, [])

  const fetchData = async (contentId: string) => {
    console.log(isOriginal)
    const path =
      isOriginal === 'true'
        ? `/originals/${contentId}`
        : `/secondaries/${contentId}`
    const response = await getAPIData(path)
    return response
  }

  const getRoyalty = async (contentId: string) => {
    // @ts-ignore
    let royaltyTmp = await contract.getRoyaltyAsString(contentId)
    setRoyalty(royaltyTmp)
  }

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
          <Container className='max-w-xs'>
            <Container component='li'>作品ID：{contentObject?.contentId}</Container>
            <Container component='li'>作品名：{contentObject?.title}</Container>
            <Container component='li'>
              情報：{contentObject?.description}
            </Container>
            <Container component='li'>
              作成日：{contentObject?.createdAt}
            </Container>
            <Container className='max-w-xs'>ロイヤリティ : {royalty}</Container>
          </Container>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default DetailPage
