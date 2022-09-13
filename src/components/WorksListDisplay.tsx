import {
  Container,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useRouter } from 'next/router'

// 作品リストの型
export interface ContentList {
  isOriginal: boolean
  title: string
  description: string
  created_at: string
}

//
interface Props {
  title: string
  array: ContentList[]
}

const WorksListDisplay = (props: Props) => {
  const title = props.title
  const array = props.array
  const router = useRouter()

  const onClickDetail = () => {
    console.log('詳細クリックされた')
    router.push(`/`)
  }

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Container
            component='h2'
            className='text-center font-semibold text-xm mt-4'
          >
            {title}
          </Container>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            {array.map((content) => {
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
    </>
  )
}

export default WorksListDisplay
