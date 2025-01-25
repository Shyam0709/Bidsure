import React from 'react'

export const Hero = () => {
  return (
    <div className='text-white'>
        <div className=' max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#00df9a] text-xl font-bold p-2'>BID AND BUY  WITH US </p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 '>EASY HIRE POLICY </h1>
            <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Fast and Flexible process</p>
            </div>
            <p className=' md:text-2xl text-xl font-bold text-gray-500 p-2'>One stop shop</p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
        </div>
    </div>
  )
}
