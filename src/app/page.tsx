import { auth } from "@/auth";
import DeleteButton from "@/components/deleteButton";
import TextForm from "@/components/textForm";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

async function fetchPosts() {
  const res = await fetch(`http://localhost:3000/api/posts`);
  const data = await res.json()
  return data.posts;
}

export default async function Home() {
  const session = await auth();

  let notLoggedIn = false;
  if (!session?.user) notLoggedIn = true;

  const posts = await fetchPosts();

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="flex justify-center">
        <TextForm userName={session?.user?.name!} isDisabled={notLoggedIn} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {
          posts.map(
            (post: any) => (
              <Card key={post._id} className="hover:border-black">
                <CardHeader>
                  <Link href={`/${post.userName}/post/${post._id}`}>
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                  </Link>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <DeleteButton id={post._id} />
                  <span className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                </CardFooter>
              </Card>
            ))
        }
      </div>
    </div>
  );
}
