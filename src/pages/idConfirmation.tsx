import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
//import Modal from "@mui/material/Modal";
import { CircularProgress, Grid } from '@mui/material'
import { NextPage } from 'next'
import Modal, { useModal } from '@/components/Element/Modal'
import { useState } from 'react'

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
    <div>
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
    </div>
  )
}

export default IdConfirmationPage
