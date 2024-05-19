import React from 'react'

function PageNotFound() {
  return (
    <div className='h-screen bg-[#212121]'>
      <h1 className='text-3xl text-center text-white'>Creo que no estas en el lugar correcto</h1>
      <p className='text-center text-[#ABABAB]'>Lo que buscas no esta por aquí.</p>
      <h2 className='text-center text-2xl text-red-400'>Error: 404</h2>
    </div>
  )
}

export default PageNotFound