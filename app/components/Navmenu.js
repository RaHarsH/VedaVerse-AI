import React from 'react'
import Link from 'next/link'

const Navmenu = ({ navMenu, toggleMenu }) => {
  return (
    <div 
      ref={navMenu} 
      className='fixed inset-0 bg-black z-50 flex flex-col justify-start items-center gap-28 text-gray-300 text-lg transition-all duration-300 ease-in-out translate-x-full'
    >
        <div className='flex justify-center items-center flex-col gap-20 w-full'>
            <h2 className='text-5xl text-gray-500 relative top-10 font-thin'>Menu</h2>
            <span className='w-full h-[0.5px] bg-gray-800'></span>
        </div>
        <div className='flex flex-col justify-center items-center gap-8 text-xl font-thin'>
            <Link href='/' onClick={toggleMenu}><p>Home</p></Link>
            <Link href='/sign-in' onClick={toggleMenu}><p>Sign in</p></Link>
            <Link href='/sign-up' onClick={toggleMenu}><p>Sign up</p></Link>
            <Link href='/search' onClick={toggleMenu}><p>Search</p></Link>
        </div>
    </div>
  )
}

export default Navmenu
