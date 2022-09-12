import { NextPage } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const CreateIdPage: NextPage = () => {

  //TODO モーダルウィンドウを出す
  const handleClick = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <Header />
      <h1 className='font-bold mt-20 text-center'>IDの発行</h1>
      <div className=' flex justify-center mt-20 text-center align-middle min-height'>
        <button
          onClick={()=>handleClick("親")}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        >
          親作品として登録
        </button>
        <button
          onClick={()=>handleClick("子")}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        >
          子作品として登録
        </button>
      </div>
    </div>
  )
}
export default CreateIdPage
