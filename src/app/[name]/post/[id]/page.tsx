async function fetchPost(id: string) {
    const res = await fetch(`http://localhost:3000/api/Simon/post/${id}`);
    const data = await res.json();
    return data;
}

export default async function PostPage({ params }: {
    params: {
        id: string
    }
}) {

    const { id } = await params;

    return (
        <div>
            <h1>{id}</h1>
        </div>
    )
}