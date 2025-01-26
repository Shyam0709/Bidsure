import React from 'react'
const Tendercard = ({tender}) => {
  return (
    
        <div className='w-[40vw] shadow-xl flex flex-col  rounded-lg hover:scale-105 duration-300 bg-white'>
           
            <h2 className='text-2xl font-bold text-center py-8'>{tender.name}</h2>
            <p className='text-center text-4xl font-bold'>Place your BIDS</p>
            <div className='text-center font-medium'>
                <p className='py-2 border-b mx-8 mt-8'>Get Contracts</p>
            </div>
            <button className='bg-black w-[200px] rounded-md font-medium  mx-auto my-6 px-6 py-3 text-[#00df9a]'>Bid Now</button>
        </div>
        
         
  )
}

export default Tendercard