"use client"

import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function page() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [cateSlug, setCateSlug] = useState("");
    const [desc, setDesc] = useState('');

    const handleSubmit = async () => {
        const res = await fetch("/api/blogWrite", {
            method: "POSt",
            body: JSON.stringify({
                title: title,
                desc: desc,
                slug: title,
                cateSlug: cateSlug || "javascript",
            })
        })
        console.log(res)
    }

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
                ['image', 'video'],
                ['clean']
            ],
        }
    }

    return (
        <div className="write__wrap">
            <div className="write__header">
                <h2>Write</h2>
                <p>Write your story, inspire the world.</p>
            </div>
            <div className="write__bottom">
                <fieldset>
                    <select onChange={(e) => setCateSlug(e.target.value)}>
                        <option value="javascript">javascript</option>
                        <option value="jquery">jquery</option>
                        <option value="html">html</option>
                    </select>
                    <legend className='blind'>글쓰기 영역</legend>
                    <label htmlFor="title" className="required blind">글 제목</label>
                    <input type="text" name="title" id="title" placeholder="글 제목을 작성하세요!" onChange={(e) => setTitle(e.target.value)} />
                    <ReactQuill
                        modules={modules}
                        theme="snow"
                        value={desc}
                        onChange={setDesc}
                        placeholder="글 내용을 작성하세요!"
                    />
                    <input type='file' onChange={(e) => setFile(e.target.files[0])} />
                    <button type="button" onClick={handleSubmit}>글쓰기</button>
                </fieldset>
            </div>
        </div >
    )
}
