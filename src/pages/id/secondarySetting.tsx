import { GetServerSideProps, NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import {
  Stack,
  TextField,
  Grid,
  Container,
  Box,
  Button,
  CircularProgress,
  Autocomplete,
} from '@mui/material'
import { useState, useCallback, useContext, useRef } from 'react'
import { useRouter } from 'next/router'
import Modal, { useModal } from '@/components/id/Modal'
import { ContractContext } from '@/pages/_app'
import ContractInteractor from '@/ethereum/ContractInteractor'
import { getAPIData } from '@/axiosUtl'
import { Controller, useForm } from 'react-hook-form'

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

type contentType = {
  isOriginal: Boolean
  contentId: number
  title: string
  description: string
  createdAt: Date
}

//@ts-ignore
const SecondarySetting: NextPage = ({ parentList, parentNames }) => {
  const router = useRouter()

  const [parentTitle, setParentTitle] = useState('')
  const [parentId, setParentId] = useState<number>(1)
  const [isParentTitleError, setIsParentTitleError] = useState(false)

  const inputRef = useRef(null)

  const contract = useContext(ContractContext) as ContractInteractor

  const { control, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      single: {},
      multi: [],
    },
  })

  // モーダルウィンドウのopen/close
  const { open, handleOpen, handleClose } = useModal()
  const [loading, setLoading] = useState(false)
  const [register, setComplete] = useState(false)

  const startLoading = async () => {
    handleOpen()
    setLoading(true)

    let contentList: contentType[] = []

    parentList.map((content: any) => {
      console.log(content)
      if (content.title == parentTitle) {
        contentList.push(content)
      }
    })


    let address = await contract.signer.getAddress()
    let contentListBefore = await contract.getContentsListAsStrings(address)

    let contentId
    console.log(contentList[0].contentId)

    try {
      await contract.registerSecondary(contentList[0].contentId)

      while (true) {
        let contentListAfter = await contract.getContentsListAsStrings(address)
        console.log('contentListAfter', contentListAfter)
        if (contentListBefore.length != contentListAfter.length) {
          contentId = contentListAfter[contentListAfter.length - 1]
          break
        } else {
          await new Promise((resolve) => setTimeout(resolve, 3000)) // 3秒待つ
        }
      }

      completeRegister()
      finishRegister(contentId)
    } catch {
      setLoading(false)
      handleClose()
      return
    }
  }
  const completeRegister = () => {
    setLoading(false)
    setComplete(true)
  }

  const finishRegister = (contentId: string) => {
    setComplete(false)
    handleClose()
    const nextPage = 'register'
    console.log('確定contentId:', contentId)
    router.push({
      pathname: `/${nextPage}`,
      query: { isOriginal: false, contentId: contentId },
    })
  }

  const inputParentTitle = useCallback(
    (event: { target: { value: any } }) => {
      const inputValue = event.target.value
      const isEmpty = inputValue === ''
      setIsParentTitleError(isEmpty)
      console.log(inputValue)
    },
    [setParentTitle, setIsParentTitleError],
  )

  const handleCheckTitle = () => {
    if (inputRef.current) {
      const ref = inputRef.current
      ref == '' ? setIsParentTitleError(true) : setIsParentTitleError(false)
    }
    return
  }

  const handleClickOpen = async () => {
    let tmptitle: any = getValues().single
    setParentTitle(tmptitle)
    handleOpen()
  }

  return (
    <>
      <Header />
      <Container className='min-h-screen text-center' component='div'>
        <h1 className='mt-10 mb-4 text-center font-bold text-lg'>ID発行</h1>
        <Grid container direction='column' alignItems='center'>
          <Stack
            component='form'
            noValidate
            onSubmit={handleSubmit(handleClickOpen)}
            spacing={2}
            sx={{ m: 2, width: '25ch' }}
          >
            <Grid item className='mt-10 mb-4 text-center font-bold text-lg'>
              親作品の設定
            </Grid>
            {/* <TextField
              type='text'
              label='親作品タイトル'
              required
              value={parentTitle}
              error={isParentTitleError}
              onChange={inputParentTitle}
              helperText={
                isParentTitleError ? '親作品のタイトルを入力してください。' : ''
              }
            /> */}
            <Controller
              control={control}
              name='single'
              render={() => (
                <Autocomplete
                  fullWidth
                  options={parentNames}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      inputRef={inputRef}
                      onChange={handleCheckTitle}
                      label='親作品タイトル'
                      error={isParentTitleError}
                      helperText={
                        isParentTitleError
                          ? '親作品のタイトルを入力してください。'
                          : ''
                      }
                    />
                  )}
                  onChange={(event, value: any) => {
                    setValue('single', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }}
                />
              )}
            />
            <Button
              type='submit'
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
                <Grid item className='mb-5 text-xl'>
                  IDを発行しますか
                </Grid>
                <Grid item className='mb-5 text-sm'>
                  「子作品」として登録します
                </Grid>
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
                <Grid item className='mb-5 text-xl'>
                  IDを発行中です
                </Grid>
                <CircularProgress color='secondary' sx={{ mt: 3, mb: 3 }} />
              </Grid>
            </Box>
          )}
          {register && (
            <Box sx={BoxStyle}>
              <Grid container direction='column' alignItems='center'>
                <Grid item className='mb-5 text-xl'>
                  IDの発行が完了しました
                </Grid>
                <Grid item className='mb-5 text-sm'>
                  続けて作品の登録を行います
                </Grid>
                {/*<Button onClick={finishRegister}>作品登録に進む</Button>*/}
              </Grid>
            </Box>
          )}
        </div>
      </Modal>
      <Footer />
    </>
  )
}

export default SecondarySetting

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getAPIData(`/contents/`)
  let parentList: any = []
  let parentNames: any = []

  const contentList = res.data.contents

  if (contentList) {
    contentList.map((content: contentType) => {
      if (content.isOriginal) {
        parentList.push(content)
        parentNames.push(content.title)
      }
    })
  }

  return {
    props: {
      parentList: parentList,
      parentNames: parentNames,
    },
  }
}
