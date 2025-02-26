import { connectDB } from "@/lib/db"
import users from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: {
    name: string
}) {
    try {
        await connectDB();

        const { name } = context;

        const user = await users.User.findOne({ userName: name });
        if (!user) return NextResponse.json({ error: "Error to get user" });

        const userPosts = await users.Post.find({ _id: { $in: user.posts } });

        return NextResponse.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            userPosts
        });
    } catch (error: any) {
        throw new Error(error)
    }
}