import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


const Home: NextPage = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-center">
     <h1 className='text-2xl font-bold mb-6'>Which one is Roundest???</h1>

     <div className='grid grid-cols-[minmax(100px,1fr)_auto_minmax(100px,1fr)] gap-x-10 w-2/3 max-w-4xl border-2 border-color-yellow-800 p-10'>
      <div className='h-96 bg-red-200 flex items-center justify-center'>CONTENT</div>
      
      <div className='self-center text-xl'>Vs</div>
      
      <div className='h-96 bg-blue-500 flex items-center justify-center'>CONTENT</div>
     </div>
    </div>
  )
}

export default Home
