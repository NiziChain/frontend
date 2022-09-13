import { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
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
  // 多分、全部取ってきて、アドレス（秘密鍵）が合うやつを取得する感じ？
  // できれば、API欲しい
  const response = {
    contents: [
      {
        isOriginal: true,
        title: 'ドラえもん',
        description: '作品ドラえもん',
        createdAt: '2022.09.30',
        contentId: '10',
      },
      {
        isOriginal: true,
        title: 'クレヨンしんちゃん',
        description: '作品クレヨンしんちゃん',
        createdAt: '2001.08.30',
        contentId: '8',
      },
      {
        isOriginal: false,
        title: 'ドラえもん戦記',
        description: 'ドラえもんを元に作成した2次作品',
        createdAt: '2022.10.30',
        contentId: '12',
      },
    ],
  }

  const router = useRouter()

  const onClickDetail = (isOriginal: boolean, contentId: string) => {
    console.log('詳細クリックされた')
    router.push({
      pathname: `/works/detail`,
      query: { isOriginal: isOriginal, contentId: contentId },
    })
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
                    key={content['createdAt']}
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
                        作成日：{content['createdAt']}
                      </Container>
                    </Container>
                    <Button
                      variant='outlined'
                      size='small'
                      className='max-h-10 mt-4'
                      onClick={() =>
                        onClickDetail(
                          content['isOriginal'],
                          content['contentId'],
                        )
                      }
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
