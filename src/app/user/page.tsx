import { auth } from "@/auth"

export default async function UserPage() {

    const session = await auth();

    return(
        <div>
            {session?.user?.email}
        </div>
    )
}