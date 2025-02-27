import Link from "next/link";

async function fetchPost(name: string, id: string) {
    const res = await fetch(`http://localhost:3000/api/${name}/post/${id}`);
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
            <div>
                <Link href={`/${post.userName}`}>{post.userName}</Link>
                <h1>{post.title}</h1>
                <h1>{post.content}</h1>
            </div>
        </div>
    )
}