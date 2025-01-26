import { Button } from '@mui/material'
import React from 'react'

const Approvecard = ({handleclick,tender,onclick}) => {
  const handlebuttonclick=()=>{
    onclick(tender.id);
    handleclick();
  }
  return (
    <div className='relative'>
        
        <div className="bg-white w-[10vw] flex flex-row justify-between h-[5vh] rounded-lg">
      <div className='font-semibold text-center w-full'>{tender.name}</div>
      <Button variant='contained' onClick={handlebuttonclick}>Show</Button>
    </div>
    </div>
  )
}

export default Approvecard