"use client"

import { signOut } from "next-auth/react"

export default function SignOut() {

    return (
        <button className="text-xl hover:underline" type="submit" onClick={() => signOut()}>Sign out</button>
    )
}