import { auth } from "@/auth";
import TextForm from "@/components/textForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

async function fetchPosts(name: string) {
  const res = await fetch(`http://localhost:3000/api/posts/${name}`);
  const data = await res.json()
  return data.userPosts;
}

export default async function Home() {
  const session = await auth();

  let isLoggedIn = false;
  if (!session?.user) isLoggedIn = true;

  const posts = await fetchPosts(session?.user?.name!);

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 gap-2">
        <TextForm userName={session?.user?.name!} isDisabled={isLoggedIn} />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {posts.map(
          (post: any) => (
            <Link href={`/post/${post._id}`}>
              <Card key={post._id}>
                <CardHeader>
                  <h1 className="text-xl">{post.title}</h1>
                </CardHeader>
                <CardContent>
                  <h1 className="text-sm">{post.content}</h1>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button className="bg-destructive">Delete</Button>
                  <span className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
