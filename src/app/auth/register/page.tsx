"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function RegisterPage() {

    async function handleForm(event: any) {
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");

            const res = await fetch("http://localhost:3000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            )

            if (res.status === 200) {
                redirect("/");
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return (
        <form onSubmit={handleForm}>
            <div className="flex justify-center">
                <Card className="w-[350px]">
                    <CardHeader>
                        <div className="flex gap-2 items-center">
                            <LockIcon/>
                            <CardTitle className="text-3xl">Register</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1>Name</h1>
                                <Input name="name" placeholder="Name" />
                            </div>
                            <div>
                                <h1>Email</h1>
                                <Input name="email" type="email" placeholder="Email" />
                            </div>
                            <div>
                                <h1>Password</h1>
                                <Input id="password" type="password" placeholder="Password" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-1 gap-2">
                        <Button type="submit">Register</Button>
                        <div className="flex gap-2">
                            <p>Do you have an account?</p>
                            <Link className="text-blue-600 underline" href={"/auth/signin"}>sign in</Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </form>
    )
}