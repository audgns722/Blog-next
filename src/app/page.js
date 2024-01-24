import Bloglist from '@/components/bloglist/Bloglist'
import Category from '@/components/category/Category'
import React from 'react'

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page || 1);
  const { cate } = searchParams;
  // console.log(cate)
  return (
    <main id='main'>
      <section className='main__header'>
        <h2>MAIN</h2>
      </section>
      <section className='main__contents'>
        <Category cate={cate} />
        <Bloglist page={page} cate={cate} />
      </section>
    </main>
  )
}
