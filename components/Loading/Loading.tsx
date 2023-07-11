'use client';
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box';
import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center lg:mt-[9rem] md:mt-[9rem] mt-[6rem] mb-[8rem] text-yellow'>
      <CircularProgress  color='inherit' size={50}/>
    </div>
  )
}

export default Loading;