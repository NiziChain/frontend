import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
//import Modal from "@mui/material/Modal";
import { CircularProgress, Container, Grid } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Modal, { useModal } from '@/components/id/Modal'
import { useState } from 'react'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'

const BoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'silver',
  color: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const TypographyStyle = {
  // display:"grid",
  // bgcolor: "blue",
  // color:"red",
  // gap:20,
}

const IdConfirmationPage: NextPage = () => {

  const router = useRouter()
  const handleClick = (isOriginal: boolean) => {
    if(isOriginal){
      console.log('親')
      router.push(`/id/originalSetting`)
    }else{
      console.log('子')
      router.push(`/id/secondarySetting`)
    }
  }

  const { open, handleOpen, handleClose } = useModal()
  const [loading, setLoading] = useState(false)
  const startLoading = () => {
    handleOpen()
    setLoading(true)
  }
  const [register, setComplete] = useState(false)

  const finishRegister = () => setComplete(false)
  const completeRegister = () => {
    setLoading(false)
    setComplete(true)
  }

  return (
    <>
      <Header />
      <div className='min-h-screen'>
        <h1 className='font-bold mt-20 text-center'>IDの発行</h1>
        <div className=' flex justify-center mt-20 text-center align-middle'>
          <button
            onClick={()=>handleClick(true)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          >
            親作品として登録
          </button>
          <button
            onClick={()=>handleClick(false)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          >
            子作品として登録
          </button>
        </div>
      </div>
      <Container component='div' className=' min-h-screen'>
        <button onClick={handleOpen}>Open Modal</button>
        <Modal open={open} className=''>
          <div>
            {!loading && !register && (
              <Box sx={BoxStyle}>
                <Typography
                  id='modal-modal-title'
                  variant='h6'
                  component='h2'
                  sx={TypographyStyle}
                >
                  IDを発行しますか？
                </Typography>
                <Button onClick={startLoading}>はい</Button>
                <Button onClick={handleClose}>いいえ</Button>
              </Box>
            )}
            {loading && (
              <Box sx={BoxStyle}>
                <Typography id='a' variant='h6' component='h2'>
                  IDを発行中です
                </Typography>
                <CircularProgress color='secondary' />
                {/* ↓　ここでローディングの終了をブロックチェーン側から受け取る */}
                <Button onClick={completeRegister}>ローディング終わり！</Button>
              </Box>
            )}
            {register && (
              <Box sx={BoxStyle}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  IDの発行が完了しました
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                  続けて作品の登録を行います
                </Typography>
                <Button onClick={finishRegister}>作品登録に進む</Button>
              </Box>
            )}
          </div>
        </Modal>
      </Container>
      <Footer />
    </>
  )
}

export default IdConfirmationPage
