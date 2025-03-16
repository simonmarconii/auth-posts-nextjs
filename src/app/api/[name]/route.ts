import { connectDB } from "@/lib/db"
import users from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {
    params: {
        name: string
    }
}) {
    try {
        await connectDB();

        const { name } = await params;

        const user = await users.User.findOne({ name });
        if (!user) return NextResponse.json({ error: "Error to get user" });

        const userPosts = await users.Post.find({ _id: { $in: user.posts } });

        return NextResponse.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            bgImg: user.bgImg,
            profileImg: user.profileImg,
            userPosts,
        });
    } catch (error: any) {
        throw new Error(error)
    }
}