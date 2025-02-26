"use server"

import { createPost, deletePost } from "@/data/createPostAndUsers";
import { revalidatePath } from "next/cache";

export async function handleCreatePost(title: string, content: string, userName: string) {
    try {
        const newPost = await createPost(title, content, userName);

        if(!newPost) return null;
        revalidatePath("/");
        return newPost;
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function handleDeletePost(id: string) {
    try {
        const postDeleted = await deletePost(id);

        if(!postDeleted) return null;
        revalidatePath("/");
        return postDeleted;
    } catch (error: any) {
        throw new Error(error);
    }
}