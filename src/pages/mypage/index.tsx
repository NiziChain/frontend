import { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { getAPIData } from '@/axiosUtl'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { WalletContext } from '../_app'
import WorkListDisplay from '../../components/mypage/WorkListDisplay'
import { ContentList } from '@/components/works/WorksListDisplay'

const MyPage: NextPage = () => {
  const userAddress = useContext(WalletContext)[0]
  const [contentList, setContentList] = useState<ContentList[]>([])

  useEffect(() => {
    fetchData().then((res) => {
      const tmp = res['data']['contents']
      setContentList(tmp)
    })
  }, [])

  const fetchData = async () => {
    const response = await getAPIData(`/authors/${userAddress}`)
    return response
  }

  return (
    <>
      <Header />
      <Container className='min-h-screen text-center' component='div'>
        <Container
          component='h2'
          className='mt-10 mb-4 text-center font-bold text-lg'
        >
          MyPage
        </Container>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Container className='text-center font-semibold text-xm mt-4'>
              自分の作品一覧
            </Container>
          </AccordionSummary>
          <AccordionDetails>
            {contentList ? (
              <WorkListDisplay array={contentList}></WorkListDisplay>
            ) : (
              <Container>作品はありません</Container>
            )}
          </AccordionDetails>
        </Accordion>
      </Container>
      <Footer />
    </>
  )
}

export default MyPage
