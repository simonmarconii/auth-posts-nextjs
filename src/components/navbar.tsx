import { auth } from "@/auth";
import Link from "next/link";
import SignOut from "./signOut";
import { UserCircleIcon } from "lucide-react";
import { ModeToggle } from "./themeButton";

export default async function NavBar() {

    const session = await auth();

    console.log({ session })

    return (
        <div className="flex justify-between items-center">
            <Link href={"/"}><h1 className="text-3xl font-bold text-center">Post-it</h1></Link>
            <div className="flex gap-3 items-center">
                {!session ?
                    (
                        <>
                            <Link className="text-xl hover:underline" href={"/auth/signin"}>Sign in</Link>
                            <p>|</p>
                            <Link className="text-xl hover:underline" href={"/auth/register"}>Register</Link>
                        </>
                    ) : (
                        <>
                            <Link href={`/${session.user?.name}`}><UserCircleIcon className="w-10 h-10" /></Link>
                            <p>|</p>
                            <SignOut />
                        </>
                    )
                }
                <ModeToggle/>
            </div>
        </div>
    )
}