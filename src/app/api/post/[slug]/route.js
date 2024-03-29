import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// detail 페이지
export const GET = async (req, { params }) => {
    const { slug } = params;

    try {
        const post = await prisma.BlogPost.update({
            where: { slug },
            data: { views: { increment: 1 } },
            include: { user: true }
        });

        return new NextResponse(
            JSON.stringify(post, { status: 200 })
        )
    }
    catch (err) {
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message: "실패" }, { status: 500 })
        )
    }
}