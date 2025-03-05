import { auth } from "@/auth";
import TextForm from "@/components/textForm";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

async function fetchPosts() {
  const res = await fetch(process.env.DATA_SOURCE_URL + `/posts`);
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
              <Link href={`/${post.userName}/post/${post._id}`}>
                <Card key={post._id} className="hover:border-black dark:hover:border-white">
                  <CardHeader>
                    <div className="border-b">
                      <p>{post.userName}</p>
                    </div>
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                  </CardHeader>
                  <CardFooter className="flex justify-end items-center">
                    <span className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </CardFooter>
                </Card>
              </Link>
            ))
        }
      </div>
    </div>
  );
}
