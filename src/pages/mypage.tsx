import { NextPage } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useRouter } from 'next/router'

const MyPage: NextPage = () => {
  // responseを実際に撮ってきたやつに変える
  const response = {
    contents: [
      {
        isOriginal: true,
        title: 'ドラえもん',
        description: '作品ドラえもん',
        created_at: '2022.09.30',
      },
      {
        isOriginal: true,
        title: 'クレヨンしんちゃん',
        description: '作品クレヨンしんちゃん',
        created_at: '2001.08.30',
      },
      {
        isOriginal: false,
        title: 'ドラえもん戦記',
        description: 'ドラえもんを元に作成した2次作品',
        created_at: '2022.10.30',
      },
    ],
  }

  const router = useRouter()

  const onClickDetail = () => {
    console.log('詳細クリックされた')
    router.push(`/`)
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
            <Container>
              {response['contents'].map((content) => {
                return (
                  <Container
                    component='ul'
                    key={content['created_at']}
                    className='flex max-w-md mt-4 mb-4 py-2 border-zinc-300 border rounded-xl'
                  >
                    <Container className='max-w-xs mt-1'>
                      <Container component='li'>
                        作品名：{content['title']}
                      </Container>
                      <Container component='li'>
                        情報：{content['description']}
                      </Container>
                      <Container component='li'>
                        作成日：{content['created_at']}
                      </Container>
                    </Container>
                    <Button
                      variant='outlined'
                      size='small'
                      className='max-h-10 mt-4'
                      onClick={onClickDetail}
                    >
                      詳細
                    </Button>
                  </Container>
                )
              })}
            </Container>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Footer />
    </>
  )
}

export default MyPage