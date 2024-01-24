import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const cate = searchParams.get("cate");
    const postView = 2;

    const query = {
        take: postView,
        skip: postView * (page - 1),
        include: { user: { select: { name: true } } },
        where: {
            ...(cate && { catSlug: cate }),
        }
    };

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count()
        ]);

        return new NextResponse(
            JSON.stringify({ posts, count }, { status: 200 })
        );
    }
    catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "실패" }, { status: 500 })
        )
    }
}