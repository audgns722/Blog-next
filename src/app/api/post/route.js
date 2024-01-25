import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const cate = searchParams.get("cate");
    const postView = 6;

    const query = {
        take: postView,
        skip: postView * (page - 1),
        include: { user: { select: { name: true } } },
        where: {
            ...(cate && { cateSlug: cate }),
        }
    };

    try {
        const [post, count] = await prisma.$transaction([
            prisma.BlogPost.findMany(query),
            prisma.BlogPost.count()
        ]);

        return new NextResponse(
            JSON.stringify({ post, count }, { status: 200 })
        );
    }
    catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "실패" }, { status: 500 })
        )
    }
}