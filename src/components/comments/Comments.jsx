"use client"

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr';
import Image from 'next/image';
import moment from 'moment'

const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message);
        throw error;
    }
    return data;
}

export default function Comments({ slug }) {
    const { status } = useSession();
    const [desc, setDesc] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedDesc, setEditedDesc] = useState("");

    const handleEditClick = (commentId, currentDesc) => {
        setEditingCommentId(commentId);
        setEditedDesc(currentDesc);
    };

    const handleDelete = async (commentId) => {
        try {
            const res = await fetch("/api/comment", {
                method: "DELETE",
                body: JSON.stringify({
                    id: commentId,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to delete comment');
            }
            mutate(); // 로컬 데이터 갱신
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // const handleUpdate = async (commentId) => {
    //     // 여기에 수정 로직 구현
    //     // 예: fetch 요청으로 서버에 수정된 내용 전송
    //     setEditingCommentId(null); // 수정 상태 종료
    //     mutate(); // 댓글 목록 갱신
    // };

    const { data, mutate, isLoading } = useSWR(`http://localhost:3000/api/comment?slug=${slug}`, fetcher)

    const handleSubmit = async () => {
        await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({ desc: desc, postSlug: slug })
        });
        mutate()
    }
    return (
        <div className="detail__comments">
            {status == "authenticated" ? (
                <>
                    <input className="comment" type='text' name='desc' onChange={(e) => setDesc(e.target.value)} placeholder='댓글을 작성해주세요'></input>
                    <button type="button" onClick={handleSubmit}>작성</button>
                </>
            ) : (
                <p>댓글을 작성하려면 로그인이 필요합니다.</p>
            )}
            {isLoading ? "isLoading" : data?.map((item) => (
                <div className="comment__list" key={item.id}>
                    {editingCommentId === item.id ? (
                        <>
                            <input
                                type="text"
                                value={editedDesc}
                                onChange={(e) => setEditedDesc(e.target.value)}
                            />

                            <div className="right">
                                <div className="profile">
                                    <Image className="profileimg" src={item.user.image} width={30} height={30} alt={item.user.name} />
                                    <div className="auth">{item.user.name}</div>
                                </div>
                                <div className="date">{moment(item.createdAt).format('YY/MM/DD HH:mm')} 작성됨</div>
                                {status === "authenticated" && (
                                    <div className="comment__actions">
                                        <button onClick={() => handleUpdate(item.id)}>저장</button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="title">{item.desc}</div>
                            <div className="right">
                                <div className="profile">
                                    <Image className="profileimg" src={item.user.image} width={30} height={30} alt={item.user.name} />
                                    <div className="auth">{item.user.name}</div>
                                </div>
                                <div className="date">{moment(item.createdAt).format('YY/MM/DD HH:mm')} 작성됨</div>
                                {status === "authenticated" && (
                                    <div className="comment__actions">
                                        <button onClick={() => handleEditClick(item.id, item.desc)}>수정</button>
                                        <button onClick={() => handleDelete(item.id)}>삭제</button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}
