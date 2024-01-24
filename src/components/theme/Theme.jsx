"use client"

import React, { useContext } from 'react'
import Image from 'next/image'
import { ThemeContext } from '@/context/ThemeContext'

export default function Theme() {
    const { toggle, theme } = useContext(ThemeContext)

    return (
        <div className='header__theme' onClick={toggle}>
            <Image src="/moon.svg" alt="darkmode" width={24} height={24} />
            <span className='ball' style={
                theme === 'light' ? { left: 2 } : { right: 2 }
            }></span>
            <Image src="/sun.svg" alt="lightmode" width={24} height={24} />
        </div>
    )
}
