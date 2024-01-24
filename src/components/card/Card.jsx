import Link from 'next/link'
import React from 'react'
import moment from 'moment'

export default function Card({ item }) {
    return (
        <Link href={`post/${item.slug}`}>
            <div className="list">
                <div className='img'>
                    <span className="cate">{item.slug}</span>
                </div>
                <div className="listbot">
                    <h3 className="title">{item.title}</h3>
                    <p className="desc">{item.desc}</p>
                    <p className="auth">{item.user.name}</p>
                    <p className="date">{moment(item.createdAt).format('YY/MM/DD HH:mm')}</p>
                </div>
            </div>
        </Link>
    )
}
