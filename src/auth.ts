import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LogInSchema } from "./lib/zod";
import users from "./lib/models/users";
import bcryptjs from "bcryptjs";
import { connectDB } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                await connectDB();

                const parsedCredentials = LogInSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    console.error("Invalid credentials: ", parsedCredentials.error.errors);
                    return null;
                }

                const { email, password } = parsedCredentials.data;

                const userFind = await users.User.findOne({ email });
                if (!userFind) {
                    console.error("Wrong email");
                    return null;
                }

                const pwdMatch = await bcryptjs.compare(password, userFind.password);
                if (!pwdMatch) {
                    console.error("Wrong password");
                    return null;
                }

                const userToRet = {
                    id: userFind._id,
                    name: userFind.name,
                    email: userFind.email
                }

                return userFind;
            }
        })
    ],
    callbacks: {
        jwt({ token, trigger, session }) {
            if (trigger === "update" && session?.name) {
                token.name = session.name
            }
            return token
        }
    },
    pages: {
        signIn: "/auth/signin",
    }
})