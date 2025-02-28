import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function fetchUser(name: string) {
    const res = await fetch(`http://localhost:3000/api/${name}`);
    const data = await res.json()
    return data;
}

export default async function UserPage({ params }: {
    params: {
        name: string
    }
}) {
    const { name } = await params;

    const user = await fetchUser(name);

    return (
        <div>
            <div className="flex justify-center relative">
                <Image src={"next.svg"} alt="User background" width={1200} height={500} className="border rounded-xl"/>
                <div className="absolute -bottom-28 left-0">
                    <UserCircleIcon className="w-32 h-32" />
                    <p className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
                        {name}
                    </p>
                    <p>{user.email}</p>
                </div>
                <div className="absolute top-0 right-0 p-3">
                    <Button>Edit</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-32">
                {user.userPosts.map(
                    (post: any) => (
                        <Link href={`/user/post/${post._id}`}>
                            <Card key={post._id} className="hover:border-black dark:hover:border-white">
                                <CardHeader>
                                    <div className="flex justify-between">
                                        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
                                            {post.title}
                                        </h1>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h1 className="text-2xl">{post.content}</h1>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
            </div>
        </div>
    )
}