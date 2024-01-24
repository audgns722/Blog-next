import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import moment from 'moment'

const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/post/${slug}`, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("실패! 다시해봐")
    }

    return res.json()
}

export default async function page({ params }) {
    const { slug } = params;

    const data = await getData(slug);

    return (
        <div className="detail__wrap">
            <div className="detail__header">
                <h2>Detail</h2>
                <p>A kind word can be a light in someone`s day.</p>
            </div>
            <div className="detail__inner">
                <div className="details">
                    <h3>{data.title}</h3>
                    <div className="profile">
                        <span className="avatar">
                            <Image src={data.user.image} width={50} height={50} alt={data.user.name} />
                        </span>
                        <span className="auth">{data.user.name}</span>
                        <span className="date">{moment(data.createdAt).format('YY/MM/DD HH:mm')} 작성됨</span>
                    </div>
                    <div className="detail__content">
                        {data.desc}
                    </div>
                    <div className="detail__bottom">
                        <div className="left">
                            <span><i></i>View{data.views}</span>
                            <span><em></em>Like 1</span>
                        </div>
                        <div className="detail__btn">
                            <Link href='/'>
                                수정
                            </Link>
                            <button>삭제</button>
                            <Link href='/blogList'>목록</Link>
                        </div>
                    </div>
                </div>
                <div className="detail__comments">
                    <form>
                        <fieldset>
                            <input className="comment" type='text' placeholder='댓글을 작성해주세요'></input>
                            <input className="password" type='password' placeholder='비밀번호는 4자리 입니다.'></input>
                            <button>작성</button>
                        </fieldset>
                    </form>
                    <div className="comment__list">
                        <div className="title">블로그가 너무 이쁘네요</div>
                        <div className="right">
                            <div className="profile">
                                <div className="profileimg"></div>
                                <div className="auth">익명</div>
                            </div>
                            <div className="date">24.01.18 작성됨</div>
                        </div>
                    </div>
                    <div className="comment__list">
                        <div className="title">블로그가 너무 이쁘네요 블로그가 너무 이쁘네요</div>
                        <div className="right">
                            <div className="profile">
                                <div className="profileimg"></div>
                                <div className="auth">익명</div>
                            </div>
                            <div className="date">24.01.18 작성됨</div>
                        </div>
                    </div>
                    <div className="comment__list">
                        <div className="title">블로그가 너무 이쁘네요</div>
                        <div className="right">
                            <div className="profile">
                                <div className="profileimg"></div>
                                <div className="auth">익명</div>
                            </div>
                            <div className="date">24.01.18 작성됨</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
