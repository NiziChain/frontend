import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { Button } from '@mui/material'

const IdConfirmationPage: NextPage = () => {
  const router = useRouter()
  const handleClick: any = (isOriginal: boolean) => {
    const nextPage = isOriginal ? 'originalSetting' : 'secondarySetting'
    router.push({
      pathname: `/id/${nextPage}`,
      query: { isOriginal: isOriginal },
    })
  }

  return (
    <>
      <Header />
      <div className='min-h-screen'>
        <h1 className='font-bold mt-20 text-center'>IDの発行</h1>
        <div className=' flex justify-center mt-20 text-center align-middle'>
          <Button
            variant='contained'
            size='small'
            className='font-bold py-3 px-5 max-h-10 m-4 bg-slate-500'
            onClick={() => handleClick(true)}
          >
            親作品の登録
          </Button>
          <Button
            variant='contained'
            size='small'
            className='font-bold py-3 px-5 max-h-10 m-4 bg-slate-500'
            onClick={() => handleClick(false)}
          >
            子作品の登録
          </Button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default IdConfirmationPage
