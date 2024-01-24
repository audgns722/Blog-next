import React from 'react'

export default function page() {
    return (
        <div className="join__wrap">
            <div className="join__header">
                <h2>Join</h2>
                <p>"Start your adventure with us, sign up today!"</p>
            </div>
            <form className="join__form">
                <fieldset>
                    <legend className="blind">회원가입 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required blind">이름</label>
                        <input
                            type="text"
                            id="youName"
                            name="youName"
                            placeholder="닉네임"
                            autoComplete='off'
                            required
                            minLength={8}
                        />
                    </div>
                    <div>
                        <button>닉네임 중복검사</button>
                    </div>
                    <div>
                        <label htmlFor="youEmail" className="required blind">이메일</label>
                        <input
                            type="email"
                            id="youEmail"
                            name="youEmail"
                            placeholder="이메일"
                            autoComplete='off'
                            required
                            minLength={8}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input
                            type="text"
                            id="youPass"
                            name="youPass"
                            placeholder="비밀번호"
                            autoComplete="off"
                            required
                            minLength={8}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPassC" className="required blind">확인 비밀번호</label>
                        <input
                            type="text"
                            id="youPassC"
                            name="youPassC"
                            placeholder="확인 비밀번호"
                            autoComplete="off"
                            required
                            minLength={8}
                        />
                    </div>
                    <button>회원가입</button>
                </fieldset>
            </form>
        </div>
    )
}
