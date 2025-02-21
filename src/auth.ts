import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LogInSchema } from "./lib/zod";
import users from "./lib/models/users";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                const parsedCredentials = LogInSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    console.error("Invalid credentials: ", parsedCredentials.error.errors);
                    return null;
                }

                const { email, password } = parsedCredentials.data;

                // const userFind = await users.User.findOne({ email });
                // if (!userFind) {
                //     console.error("Wrong email");
                //     return null;
                // }

                // const pwdMatch = bcrypt.compare(password, userFind.password);
                // if (!pwdMatch) {
                //     console.error("Wrong password");
                //     return null;
                // }

                const userFind = {
                    id: "1",
                    name: "Simon",
                    email: email
                }
                if (!userFind) {
                    console.log("Invalid credentials");
                    return null;
                }

                return userFind;
            }
        })
    ],
    pages: {
            signIn: "/auth/signin",
        }
    })