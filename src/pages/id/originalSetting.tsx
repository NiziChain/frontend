import { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import {
  Stack,
  TextField,
  Grid,
  Container,
  Box,
  Button,
  CircularProgress
} from '@mui/material'
import { useState, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import Modal, { useModal } from '@/components/id/Modal'
import ContractInteractor from "@/ethereum/ContractInteractor";
import { ContractContext } from "@/pages/_app";

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

  const contract = useContext(ContractContext) as ContractInteractor;

  // モーダルウィンドウのopen/close
  const { open, handleOpen, handleClose } = useModal()
  const [loading, setLoading] = useState(false)
  const [register, setComplete] = useState(false)
  const startLoading = async () => {
    handleOpen();
    setLoading(true)

    let address = await contract.signer.getAddress()
    let contentListBefore = (await contract.getContentsListAsStrings(address));
    console.log("contentListBefore:", contentListBefore);

    let contentId;

    // ここでメタマスクの確認画面が表示される
    try {
      await contract.registerOriginal(royalty);

      while(true) {
        let contentListAfter = (await contract.getContentsListAsStrings(address));
        console.log("contentListAfter", contentListAfter)
        if(contentListBefore.length != contentListAfter.length) {
          contentId = contentListAfter[contentListAfter.length-1];
          break;
        } else {
          await new Promise(resolve => setTimeout(resolve, 3000)) // 3秒待つ
        }
      }

      completeRegister();
      // 確認（OK）を押したら次の画面へ
      finishRegister(contentId);
    } catch {
      setLoading(false);
      handleClose();
      return ;
    }
  }
  const completeRegister = () => {
    setLoading(false)
    setComplete(true)
  }
  const finishRegister = (contentId: string) => {
    setComplete(false)
    handleClose()
    //TODO 次に作品登録
    const nextPage = 'register'
    console.log("確定したconetntId:", contentId);
    router.push({
      pathname: `/${nextPage}`,
      query: { isOriginal: true, contentId: contentId },
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO バリデーションをここに！
    if (isNaN(royalty)) {
      setIsRoyaltyError(true)
    }

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
              label="ロイヤリティ"
              required
              value={royalty}
              error={isRoyaltyError}
              onChange={inputRoyalty}
              helperText={isRoyaltyError ? 'ロイヤリティを数値で入力してください。' : ''}
            />
            <Button
              type="submit"
              variant='contained'
              size='small'
              className='font-bold max-h-10 mt-4 bg-slate-500'
            >
              ID発行
            </Button>
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
