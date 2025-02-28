"use client"

import { handleDeletePost } from "@/action/postsActions";
import { Button } from "./ui/button";

export default function DeleteButton({ id }: { id: string }) {
    return (
        <Button className="bg-red-600 hover:bg-destructive dark:text-white" onClick={() => {
            handleDeletePost(id);
        }}>
            Delete
        </Button>
    )
}