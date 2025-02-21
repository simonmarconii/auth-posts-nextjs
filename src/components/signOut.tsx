"use client"

import { handleSignOut } from "@/action/authActions"

export default function SignOut() {

    return (
        <form onSubmit={handleSignOut}>
            <button className="text-xl hover:underline" type="submit">Sign out</button>
        </form>
    )
}