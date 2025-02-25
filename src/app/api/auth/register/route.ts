import { connectDB } from "@/lib/db";
import { RegisterSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import users from "@/lib/models/users";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();
        connectDB();

        const validatedFields = await RegisterSchema.safeParse({
            name,
            email,
            password
        });
        if (!validatedFields.success) {
            return NextResponse.json({ error: validatedFields.error.flatten().fieldErrors });
        }

        const nameRepeated = await users.User.findOne({ name });
        const emailRepeated = await users.User.findOne({ email });
        if (nameRepeated || emailRepeated) {
            return NextResponse.json({ error: "Name or email in use" });
        }

        const passwordHash = await bcryptjs.hashSync(password, 10);

        const newUser = await users.User.create({
            name,
            email,
            password: passwordHash
        })

        return NextResponse.json({ newUser });
    } catch (error: any) {
        throw new Error(error);
    }
}