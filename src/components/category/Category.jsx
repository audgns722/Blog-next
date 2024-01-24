import Link from 'next/link'
import React from 'react'

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/category", {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("실패! 다시해봐")
    }

    return res.json()
}

export default async function Category({ cate }) {
    const data = await getData();
    console.log(`cate: ${cate}`)
    return (
        <div className="list__bottom">
            <div className="list__nav">
                <div className="left">
                    <span><Link href='/' className={!cate ? 'active' : ''}>ALL</Link></span>
                    {data.map((item) => (
                        <span key={item.id}><Link href={`?cate=${item.slug}`} className={cate === item.slug ? 'active' : ''}>{item.title}</Link></span>
                    ))}
                </div>
                <Link href="/blogWrite">글쓰기</Link>
            </div>
        </div>
    )
}
