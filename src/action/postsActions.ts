"use server"

import { createPost, deletePost, updateUserEmail, updateUserName, updateUserPassword } from "@/data/createDeletePosts";
import { revalidatePath } from "next/cache";

export async function handleCreatePost(title: string, content: string, userName: string) {
    try {
        const newPost = await createPost(title, content, userName);

        if (!newPost) return null;
        revalidatePath("/");
        return newPost;
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function handleDeletePost(id: string) {
    try {
        const postDeleted = await deletePost(id);

        if (!postDeleted) return null;
        revalidatePath(`/${postDeleted.userName}`);
        return postDeleted;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function handleUpdatePost(key: string, dataSearch: string, newData: string) {
    let result;

    switch (key) {
        case "Name":
            result = await updateUserName(dataSearch, newData);
        case "Email":
            result = await updateUserEmail(dataSearch, newData);
    }

    return result;
}

export async function handleUpdatePassword(userName: string, oldPassword: string, newPassword: string) {
    const result = await updateUserPassword(userName, oldPassword, newPassword);
    return result;
}