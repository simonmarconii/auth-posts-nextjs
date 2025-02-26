import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

async function fetchPosts(name: string) {
    const res = await fetch(`http://localhost:3000/api/${name}`);
    const data = await res.json()
    return data.userPosts;
}

export default async function UserPage({ params }: {
    params: {
        name: string
    }
}) {
    const { name } = await params;

    const posts = await fetchPosts(name);

    return (
        <div>
            <div className="flex justify-center">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
                    {name}
                </h1>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-8">
                {posts.map(
                    (post: any) => (
                        <Link href={`/user/post/${post._id}`}>
                            <Card key={post._id} className="hover:border-black">
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