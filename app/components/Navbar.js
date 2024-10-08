'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navmenu from './Navmenu'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const menuIcon = useRef(null)
    const navMenu = useRef(null)

    
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    // Animate the nav menu on smaller devices
    useEffect(() => {
        if (menuIcon.current) {
            if (isOpen) {
                gsap.to(".top-bar", { rotation: 45, y: 3, duration: 0.3, ease: 'power1.inOut' })
                gsap.to(".bottom-bar", { rotation: -45, y: -6, duration: 0.3, ease: 'power1.inOut' })
            } else {
                gsap.to(".top-bar", { rotation: 0, y: 0, duration: 0.3, ease: 'power1.inOut' })
                gsap.to(".bottom-bar", { rotation: 0, y: 0, duration: 0.3, ease: 'power1.inOut' })
            }
        }
    }, [isOpen])

    
    useEffect(() => {
        if (navMenu.current) {
            if (isOpen) {
                gsap.to(navMenu.current, { x: 0, duration: 0.2, ease: 'power4.out' })
            } else {
                gsap.to(navMenu.current, { x: '100%', duration: 0.2, ease: 'power4.out' })
            }
        }
    }, [isOpen])

    return (
        <nav className='relative'>
            <div className='navbar w-full z-50 fixed top-0 left-0 flex items-center justify-between md:justify-around py-5 px-14 backdrop-blur-[10px] border-b border-gray-300'>
                <div className='logo-container'>
                    <Link href='/' className='flex justify-evenly items-center gap-4'>
                        <p>Logo</p>
                        <h2 className='font-light text-gray-700'>Veda<span className='text-gray-950'>verse</span></h2>
                    </Link>
                </div>

                {/* Hamburger icon */}
                <div ref={menuIcon} className="hamburger z-50 md:hidden flex flex-col justify-center gap-2 cursor-pointer" onClick={toggleMenu}>
                    <span className="top-bar block h-[0.5px] w-5 bg-black transition-transform"></span>
                    <span className="bottom-bar block h-[0.5px] w-5 bg-black transition-transform"></span>
                </div>

                {/* nav menu for larger devices */}
                <div className='nav-items hidden md:flex justify-evenly items-center gap-8 text-sm'>
                    <Link href='/'><p>Home</p></Link>
                    <Link href='/sign-in'><p>Sign in</p></Link>
                    <Link href='/sign-up'><p>Sign up</p></Link>
                    <Link href='/search'><p>Search</p></Link>
                </div>
            </div>

            {/* Full-screen Navmenu */}
            <Navmenu isOpen={isOpen} navMenu={navMenu} toggleMenu={toggleMenu} />
        </nav>
    )
}

export default Navbar
