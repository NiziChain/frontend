import { NextPage } from 'next'
import Box from '@mui/material/Box'
import { BoxStyle } from '../id/originalSetting'
import { Button } from '@mui/material'
import Header from '@/components/base/Header'
import Modal, { useModal } from '@/components/id/Modal'


const RegisterCompletePage: NextPage = () => {
  const { open, handleOpen, handleClose } = useModal()
  return (
    <div className='min-h-screen'>
      <Header />
      <Button onClick={handleOpen}>Show Modal</Button>
      <Modal open={open} className=''>
        <Box sx={BoxStyle}>
          <div className='flex flex-col justify-center text-center'>
            <p>登録完了しました</p>
            <Button onClick={handleClose}>戻る</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default RegisterCompletePage
