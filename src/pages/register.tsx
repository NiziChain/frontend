import { NextPage } from 'next'
import { useState } from 'react'

import { Controller, useForm } from 'react-hook-form'

const RegisterPage: NextPage = () => {
  //id,title,description,親作品名(←これは入力しない)

  type formInfo = {
    itemId: number
    title: string
    description: string
    parentTitle?: string
  }

  //   const [values, setValues] = useState<formInfo>({
  //     itemId: 0,
  //     title: '',
  //     description: '',
  //     parentTitle: '',
  //   })

  const { register, handleSubmit, control } = useForm({
    //defaultValues: { itemId: 0, title: '', description: '', parentTitle: '' },
  })

  //todo：後でPOST実装する
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className=' flex justify-center mt-20 text-center align-middle'>
      <form
        className='flex flex-col justify-center items-center w-[300px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='font-bold'>作品登録</h1>
        <div className=''>
          <label
            htmlFor='id'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            id
          </label>
          <input
            id='id'
            {...register('itemId')}
            className='placeholder:italic placeholder:text-slate-400  bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
          />
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
        <div>
          <label
            htmlFor='parentTitle'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            親作品情報
          </label>
          <input
            id='parentTitle'
            disabled={true}
            {...register('parentTitle')}
            className=' border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        >
          登録
        </button>
      </form>
    </div>
  )
}
export default RegisterPage
