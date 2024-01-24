import Link from 'next/link'
import React from 'react'
import Menu from '../menu/Menu'
import Theme from '../theme/Theme'

export default function Header() {
    return (
        <header id="header" role="banner">
            <div className='header__wrap'>
                <div className='left'>
                    <h1 className='logo'>
                        <Link href="/">Hun`s blog</Link>
                    </h1>
                    <nav className='nav'>
                        <ul>
                            <li>
                                <Link className="active" href="/blogList">Blog</Link>
                            </li>
                            <li>
                                <Link href="/notice">Notice</Link>
                            </li>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='right'>
                    <Menu />
                    <Theme />
                </div>
            </div>
        </header>
    )
}
