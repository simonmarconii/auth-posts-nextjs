import { connectDB } from "@/lib/db";
import users from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        connectDB();

        const { title, content, userName } = await req.json();

        const newPost = await users.Post.create({
            userName,
            title,
            content
        });

        await users.User.findOneAndUpdate(
            { name: userName },
            { $push: { posts: newPost } }
        );

        return NextResponse.json({ newPost });
    } catch (error: any) {
        throw new Error(error)
    }
}