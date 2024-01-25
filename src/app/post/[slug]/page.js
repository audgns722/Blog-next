import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import moment from 'moment'
import Comments from '@/components/comments/Comments'

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
                <Comments slug={slug} />
            </div>
        </div>
    )
}
