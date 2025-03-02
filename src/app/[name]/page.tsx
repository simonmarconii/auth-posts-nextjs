import { auth } from "@/auth";
import DeleteButton from "@/components/deleteButton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { EditIcon, UserCircleIcon } from "lucide-react";
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
    const session = await auth();

    const { name } = await params;

    const isUserPorfile = session?.user?.name === name;

    const user = await fetchUser(name);

    return (
        <div>
            <div className="flex justify-center relative">
                <Image src={"next.svg"} alt="User background" width={1200} height={500} className="border rounded-xl" />
                <div className="absolute -bottom-28 left-0">
                    <UserCircleIcon className="w-32 h-32" />
                    <p className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
                        {name}
                    </p>
                    <p>{user.email}</p>
                </div>
                <div className="absolute top-0 right-0 p-4">
                    {isUserPorfile ?    
                        (
                            <Link href={`/${user.name}/edit`}><EditIcon /></Link>
                        ):(
                            <></>
                        )
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-32">
                {user.userPosts.map(
                    (post: any) => (
                        <Card key={post._id} className="hover:border-black dark:hover:border-white">
                            <CardHeader>
                                <Link href={`/user/post/${post._id}`}>
                                    <div className="flex justify-between">
                                        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
                                            {post.title}
                                        </h1>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <h1 className="text-2xl">{post.content}</h1>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                {isUserPorfile ?
                                    (
                                        <DeleteButton id={post._id} />
                                    ) : (
                                        <></>
                                    )
                                }
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </div>
    )
}