"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function page() {
    const { data, status } = useSession();
    const router = useRouter();

    // console.log(data, status)

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
        }
    }, [data, status])

    if (status === "loading") {
        return <div className='loading'>로딩중입니다.</div>
    }

    return (
        <div className="login__wrap">
            <div className="login__header">
                <h2>login</h2>
                <p>Join our community, where every moment matters.</p>
            </div>
            <form className="login__form">
                <fieldset>
                    <legend className="blind">로그인 영역</legend>
                    <div>
                        <label htmlFor="youEmail" className="required blind">이메일</label>
                        <input
                            type="email"
                            id="youEmail"
                            name="youEmail"
                            placeholder="이메일"
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input
                            type="password"
                            id="youPass"
                            name="youPass"
                            placeholder="비밀번호"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div>
                    </div>
                    <button type="submit">로그인</button>
                    <Link href='/join'><div className="joinbtn">회원가입</div></Link>
                    <div className='btn__wrap'>
                        <span className="google" onClick={() => signIn("google")}></span>
                        <span className="github" onClick={() => signIn("github")}></span>
                        <span className="facebook" onClick={() => signIn("facebook")}></span>
                        <span className="kakao" onClick={() => signIn("kakao")}></span>
                        <span className="naver" onClick={() => signIn("naver")}></span>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
