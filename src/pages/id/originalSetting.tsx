import { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import {
  Stack,
  TextField,
  Grid,
  Container,
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Modal, { useModal } from '@/components/id/Modal'

export const BoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'snow',
  color: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const OriginalSetting: NextPage = () => {

  const router = useRouter()

  const [royalty, setRoyalty] = useState(0)
  const [isRoyaltyError, setIsRoyaltyError] = useState(false)

  // モーダルウィンドウのopen/close
  const { open, handleOpen, handleClose } = useModal()
  const [loading, setLoading] = useState(false)
  const [register, setComplete] = useState(false)
  const startLoading = () => {
    handleOpen()
    setLoading(true)
  }
  const completeRegister = () => {
    setLoading(false)
    setComplete(true)
  }
  const finishRegister = () => {
    setComplete(false)
    handleClose()
    //TODO 次に作品登録
    const nextPage = 'register'
    router.push({
      pathname: `/${nextPage}`,
      query: { isOriginal: true},
    })
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
    //TODO バリデーションをここに！
    if (isNaN(royalty)) {
      setIsRoyaltyError(true)
    }
    
    //TODO Submit処理！！
    console.log(`Sybmit Royalty: ${royalty}`)
    handleOpen()
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
      <Modal open={open} className=''>
        <div>
          {!loading && !register && (
            <Box sx={BoxStyle}>
              <Grid container direction='column' alignItems='center'>
                <Grid item className='mb-5 text-xl'>IDを発行しますか</Grid>
                <Grid item className='mb-5 text-sm'>「親作品」として登録します</Grid>
                <Grid item>
                  <Button onClick={startLoading}>はい</Button>
                  <Button onClick={handleClose}>いいえ</Button>
                </Grid>
              </Grid>
            </Box>
          )}
          {loading && (
            <Box sx={BoxStyle}>
              <Grid container direction='column' alignItems='center'>
                <Grid item className='mb-5 text-xl'>IDを発行中です</Grid>
                <CircularProgress color='secondary' sx={{ mt: 3, mb: 3 }} />
                {/*TODO ↓　ここでローディングの終了をブロックチェーン側から受け取る */}
                <Button onClick={completeRegister}>ローディング終わり！</Button>
              </Grid>
            </Box>
          )}
          {register && (
            <Box sx={BoxStyle}>
              <Grid container direction='column' alignItems='center'>
                <Grid item className='mb-5 text-xl'>IDの発行が完了しました</Grid>
                <Grid item className='mb-5 text-sm'>続けて作品の登録を行います</Grid>
                <Button onClick={finishRegister}>作品登録に進む</Button>
              </Grid>
            </Box>
          )}
        </div>
      </Modal>
      <Footer />
    </>
  )
}

export default OriginalSetting
