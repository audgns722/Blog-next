import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// 글 작성하기
export const POST = async (req) => {
    const session = await getAuthSession()

    if (!session) {
        return new NextResponse(JSON.stringify({ message: "not Authenicated" }, { status: 401 }))
    }

    try {
        const body = await req.json();
        const blogPost = await prisma.BlogPost.create({
            data: { ...body, userEmail: session.user.email },
        })

        return new NextResponse(JSON.stringify(blogPost, { status: 200 }))
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "server err!" }, { status: 500 }))
    }
}