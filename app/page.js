import React from 'react'
import Footer from './components/Footer'

const Home = () => {
  return (
    <>
      <div className='h-screen w-full text-8xl flex justify-center items-center'>Landing page</div>
      <div className='h-screen w-full text-8xl flex justify-center items-center'>About section</div>
      <div className='h-screen w-full text-8xl flex justify-center items-center'>Features</div>

      {/* Footer is only displayed here not in other pages */}
      <Footer />
    </>
  )
}

export default Home