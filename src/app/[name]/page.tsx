import { auth } from "@/auth";
import DeleteButton from "@/components/deleteButton";
import { BackgroundImg, ProfileImg } from "@/components/profileImg";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { UpdateBgImageButton } from "@/components/updateImageButton";
import { UserCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function fetchUser(name: string) {
    const res = await fetch(process.env.DATA_SOURCE_URL + `/${name}`);
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
        <div className="grid grid-cols-1 gap-40">
            <div className="flex justify-center relative">
                <BackgroundImg image={user.bgImg} />
                <div className="absolute -bottom-36 left-0 ">
                    {user.profileImg ?
                        (
                            <ProfileImg image={user.profileImg} />
                        ) : (
                            <UserCircleIcon className="w-[200px] h-[200px] bg-white rounded-full dark:bg-slate-950" />
                        )
                    }
                    <p className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
                        {name}
                    </p>
                    <p>{user.email}</p>
                </div>
                <div className="absolute -bottom-12 right-0">
                    {isUserPorfile ?
                        (
                            <Link href={`/${user.name}/edit`} className={buttonVariants({ variant: "default" })}>Edit profile</Link>
                        ) : (
                            <></>
                        )
                    }
                </div>
                <div className="absolute top-0 right-0 p-4">
                    {isUserPorfile ?
                        (
                            <UpdateBgImageButton userName={session.user?.name!} />
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
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