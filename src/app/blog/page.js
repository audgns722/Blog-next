import Bloglist from '@/components/bloglist/Bloglist'
import Category from '@/components/category/Category'
import React from 'react'

export default function page() {
    return (
        <div className="list__wrap">
            <div className="list__header">
                <h2>Wellcome</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>"Where every word tells a story."</p>
                <input type="text" placeholder="게시글을 검색해주세요" />
            </div>
            <Bloglist />
            <Category />
        </div>
    )
}
