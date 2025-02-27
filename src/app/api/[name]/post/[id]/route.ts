import { connectDB } from "@/lib/db"
import users from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {
    params: {
        id: string
    }
}) {
    try {
        await connectDB();

        const { id } = await params;

        const post = await users.Post.findOne({ _id: id });
        if (!post) return NextResponse.json({ error: "Error to get post" });

        return NextResponse.json({
            _id: post._id,
            title: post.title,
            content: post.content,
            userName: post.userName,
            createdAt: post.createdAt
        });
    } catch (error: any) {
        throw new Error(error)
    }
}