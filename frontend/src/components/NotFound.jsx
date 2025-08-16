import React from 'react'

function NotFound() {
  return (
    <div className='font-inter text-sm mt-[60px] h-[calc(100vh-60px)] text-white justify-center items-center flex flex-col'>
        <p className='text-violet-700 mb-5 text-4xl font-extrabold'>OOPS :(</p>
        <p className='text-violet-950 text-2xl font-bold mb-1'>Error Code : 404</p>
        <p className='text-violet-950 text-center' >The URL you are requesting is either invalid or isn't available at the moment.</p>
    </div>
  )
}

export default NotFound