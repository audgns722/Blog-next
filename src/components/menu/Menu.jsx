"use client"

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function Menu() {
    // const status = "unauthenicated"
    // const name = "huns"

    const { data: session, status } = useSession();
    return (
        <ul>
            {status === "authenticated" ? (
                <>
                    <li><span>{session.user.name}님 환영합니다.😍</span></li>
                    <li><span onClick={signOut}>로그아웃</span></li>
                </>
            ) : (
                <>
                    <li><Link href='/login'>로그인</Link></li>
                    <li><Link href='/join'>회원가입</Link></li>
                </>
            )}
        </ul>
    )
}
