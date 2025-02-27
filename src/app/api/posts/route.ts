import { connectDB } from "@/lib/db";
import users from "@/lib/models/users";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const posts = await users.Post.find();
        if (!posts) return NextResponse.json({ error: "Error to get all the posts" });

        return NextResponse.json({ posts });
    } catch (error: any) {
        throw new Error(error);
    }
}