import { connectDB } from "@/lib/db"
import users from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: {
    id: string
}) {
    try {
        await connectDB();

        const { id } = context;

        const post = await users.Post.findOne({ _id: id });
        if (!post) return NextResponse.json({ error: "Error to get post" });

        return NextResponse.json({
            _id: post._id,
            userName: post.userName,
            createdAt: post.createdAt
        });
    } catch (error: any) {
        throw new Error(error)
    }
}