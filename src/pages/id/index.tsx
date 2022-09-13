import * as React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'


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
          <button
            onClick={() => handleClick(true)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          >
            親作品として登録
          </button>
          <button
            onClick={() => handleClick(false)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          >
            子作品として登録
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default IdConfirmationPage
