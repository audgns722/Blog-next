import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// 모든 댓글 가져오기
export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("slug")

    try {
        const comment = await prisma.Comments.findMany({
            where: {
                ...(postSlug && { postSlug })
            },
            include: { user: true },
        });

        return new NextResponse(
            JSON.stringify(comment, { status: 200 })
        )
    }
    catch (err) {
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message: "실패" }, { status: 500 })
        )
    }
}

// 댓글 작성하기
export const POST = async (req) => {
    const session = await getAuthSession()

    if (!session) {
        return new NextResponse(JSON.stringify({ message: "not Authenicated" }, { status: 401 }))
    }

    try {
        const body = await req.json();
        const comment = await prisma.Comments.create({
            data: { ...body, userEmail: session.user.email },
        })

        return new NextResponse(JSON.stringify(comment, { status: 200 }))
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "server err!" }, { status: 500 }))
    }
}


// 댓글 삭제
export const DELETE = async (req) => {
    const session = await getAuthSession();

    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated" }, { status: 401 }));
    }

    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return new NextResponse(JSON.stringify({ message: "Comment ID is required" }, { status: 400 }));
        }

        // 댓글 삭제
        await prisma.Comments.delete({
            where: { id },
        });

        return new NextResponse(JSON.stringify({ message: "Comment deleted successfully" }, { status: 200 }));
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ message: "Comment deletion failed" }, { status: 500 }));
    }
};