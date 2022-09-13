import { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import {
  Stack,
  TextField,
  Grid,
  Container,
} from '@mui/material'
import { useState, useCallback } from 'react'

const SecondarySetting: NextPage = () => {

  const [parentTitle, setParentTitle] = useState('')
  const [parentId, setParentId] = useState()
  const [isParentTitleError, setIsParentTitleError] = useState(false)

  const onSubmit = () => {
    console.log('発行！')
  }

  const inputParentTitle = useCallback(
    (event: { target: { value: any } }) => {
      const inputValue = event.target.value
      const isEmpty = inputValue === ''
      setParentTitle(inputValue)
      setIsParentTitleError(isEmpty)
    },
    [setParentTitle, setIsParentTitleError]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // バリデーションをここに！
    const isEmptyName = parentTitle === ''
    if (isEmptyName) {
      setIsParentTitleError(true)
    }
    
    // Submit処理！！
    // TODO ここでデータベースでIDの検索をかける
    console.log(`Sybmit ParentTitle: ${parentTitle}`)
  }

  return (
    <>
      <Header />
      <Container className='min-h-screen text-center' component='div'>
        <h1 className='mt-10 mb-4 text-center font-bold text-lg'>ID発行</h1>
        <Grid container direction="column" alignItems="center">
          <Stack component="form" noValidate onSubmit={handleSubmit} spacing={2} sx={{ m: 2, width: '25ch' }}>
            <Grid  item className='mt-10 mb-4 text-center font-bold text-lg'>親作品の設定</Grid >
            <TextField
              type="text"
              label="親作品タイトル"
              required
              value={parentTitle}
              error={isParentTitleError}
              onChange={inputParentTitle}
              helperText={isParentTitleError ? '親作品のタイトルを入力してください。' : ''}
            />
            <button
              type="submit"
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
            >
              ID発行
            </button>
          </Stack>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default SecondarySetting
