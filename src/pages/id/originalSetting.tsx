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

const OriginalSetting: NextPage = () => {

  const [royalty, setRoyalty] = useState(0)
  const [isRoyaltyError, setIsRoyaltyError] = useState(false)

  const onSubmit = () => {
    console.log('発行！')
  }

  const inputRoyalty = useCallback(
    (event: { target: { value: any } }) => {
      const inputValue = event.target.value
      const isEmpty = inputValue === ''
      setRoyalty(inputValue)
      setIsRoyaltyError(isEmpty)
    },
    [setRoyalty, setIsRoyaltyError]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // バリデーションをここに！
    // const isEmptyName = royalty === 0

    if (isNaN(royalty)) {
      setIsRoyaltyError(true)
    }
    
    // Submit処理！！
    console.log(`Sybmit Royalty: ${royalty}`)
  }

  return (
    <>
      <Header />
      <Container className='min-h-screen text-center' component='div'>
        <h1 className='mt-10 mb-4 text-center font-bold text-lg'>ID発行</h1>
        <Grid container direction="column" alignItems="center">
          <Stack component="form" noValidate onSubmit={handleSubmit} spacing={2} sx={{ m: 2, width: '25ch' }}>
            <Grid  item className='mt-10 mb-4 text-center font-bold text-lg'>ロイヤリティの設定</Grid >
            <TextField
              type="text"
              label="ロイヤルティ"
              required
              value={royalty}
              error={isRoyaltyError}
              onChange={inputRoyalty}
              helperText={isRoyaltyError ? 'ロイヤリティを数値で入力してください。' : ''}
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

export default OriginalSetting
