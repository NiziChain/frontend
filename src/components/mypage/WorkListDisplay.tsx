import { ContentList } from '@/components/works/WorksListDisplay'
import { Button, Container } from '@mui/material'
import { useRouter } from 'next/router'

interface Props {
  array: ContentList[]
}

const WorkListDisplay = (props: Props) => {
  const router = useRouter()
  const array = props.array

  const onClickDetail = (isOriginal: boolean, contentId: string) => {
    console.log('詳細クリックされた')
    router.push({
      pathname: `/works/detail`,
      query: { isOriginal: isOriginal, contentId: contentId },
    })
  }
  return (
    <>
      <Container>
        {array.map((content, index) => {
          return (
            <Container
              component='ul'
              key={index}
              className='flex max-w-md mt-4 mb-4 py-2 border-zinc-300 border rounded-xl'
            >
              <Container className='max-w-xs mt-1'>
                <Container component='li'>作品名：{content['title']}</Container>
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
                  onClickDetail(content['isOriginal'], content['contentId'])
                }
              >
                詳細
              </Button>
            </Container>
          )
        })}
      </Container>
    </>
  )
}

export default WorkListDisplay
