import { NextPage } from 'next'
import Box from '@mui/material/Box'
import { BoxStyle } from '../id'
import { Button } from '@mui/material'
import Header from '@/components/base/Header'
import Modal, { useModal } from '@/components/id/Modal'
import Footer from '@/components/base/Footer'

const RegisterCompletePage: NextPage = () => {
  const { open, handleOpen, handleClose } = useModal()
  return (
    <>
      <Header />
      <div className='min-h-screen'>
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
      <Footer />
    </>
  )
}

export default RegisterCompletePage
