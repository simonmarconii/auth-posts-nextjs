import Link from "next/link";

async function fetchPost(name: string, id: string) {
    const res = await fetch(process.env.DATA_SOURCE_URL + `/${name}/post/${id}`);
    const data = await res.json();
    return data;
}

export default async function PostPage({ params }: {
    params: {
        name: string,
        id: string
    }
}) {
    const { name, id } = await params;

    const post = await fetchPost(name, id);

    return (
        <div>
            <div className="grid grid-cols-1 gap-5">
                <div className="flex justify-between items-end border-b">
                    <h1 className="text-4xl font-bold">
                        <Link href={`/${post.userName}`}>{post.userName}</Link>
                    </h1>
                    <span className="">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-1 gap-3 p-5">
                    <h1 className="text-xl">{post.title}</h1>
                    <h1 className="text-xl">{post.content}</h1>
                </div>
            </div>
        </div>
    )
}