import React from 'react'
import Card from '../card/Card'
import Pagenation from '../pagenation/Pagenation'

const getData = async (page, cate) => {
    const res = await fetch(`http://localhost:3000/api/post?page=${page}&cate=${cate || ''}`, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("실패! 다시해봐")
    }

    return res.json()
}

export default async function Bloglist({ page, cate }) {
    const { post, count } = await getData(page, cate);
    const postView = 2;

    return (
        <>
            <div className="lists__wrap">
                {post.map((item) => (
                    <Card item={item} key={item.id} />
                ))}
            </div>
            <Pagenation page={page} count={count} postView={postView} />
        </>
    )
}
