import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { NextPage } from 'next'
import { useState } from 'react'
import { Button, Alert } from '@mui/material'
import { postAPIData } from '@/axiosUtl'

import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { WalletContext } from '../_app'

const RegisterPage: NextPage = () => {
  const router = useRouter()
  const isOriginal = router.query['isOriginal']
  const contentId = router.query['contentId']
  const userAddress = useContext(WalletContext)[0]

  const [errorMessages, setErrorMessages] = useState<string[]>([])

  const { register, handleSubmit, control } = useForm({
    //defaultValues: { itemId: 0, title: '', description: '', parentTitle: '' },
  })

  //todo：2次作品の場合、親のIDを取得する
  const onSubmit = (data: any) => {
    console.log(data)
    const params =
      isOriginal === 'true'
        ? {
            authorAddress: userAddress,
            contentId: contentId,
            title: data['title'],
            description: data['description'],
          }
        : {
            authorAddress: userAddress,
            parentTitle: data['parentTitle'],
            contentId: contentId,
            title: data['title'],
            description: data['description'],
          }
    const path = isOriginal==='true' ? '/originals' : '/secondaries'
    console.log(params)
    console.log(path)
    postAPIData(path, params)
      .then(() => {
        router.push('/works')
      })
      .catch((error) => {
        setErrorMessages(error.response.data.detailMessage)
      })
  }

  return (
    <>
      <Header />
          <div className=' flex justify-center text-center min-h-screen'>
            <form
              className='flex flex-col justify-center items-center w-[300px]'
              onSubmit={handleSubmit(onSubmit)}
            >
          {errorMessages.length > 0 && (
            errorMessages.map((errorMessage: string) => {
              return <Alert className='mb-2' severity='error'>{errorMessage}</Alert>
            })
          )}
          <h1 className='font-bold'>作品登録</h1>
          <div className=''>
          </div>
          <div>
            <label
              htmlFor='title'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              title
            </label>
            <input
              id='title'
              {...register('title')}
              className='placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='description'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Description
            </label>
            <input
              id='description'
              {...register('description')}
              className='placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
            />
          </div>
          {isOriginal === 'false' && (
            <div>
              <label
                htmlFor='parentTitle'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                親作品のタイトル
              </label>
              <input
                id='parentTitle'
                {...register('parentTitle')}
                className='placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
              />
            </div>
          )}

          <Button
            type='submit'
            variant='contained'
            size='small'
            className='font-bold max-h-10 mt-4 bg-slate-500'
            onClick={() => {}}
          >
            登録
          </Button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default RegisterPage
