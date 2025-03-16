"use server"

import { uploadImage } from "@/data/uploadImages";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function handleUploadBgImage(file: File, userName: string) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join("public", "background", file.name);
    await writeFile(path, buffer);

    const pathToPut = `/background/${file.name}`;

    const result = await uploadImage(userName, pathToPut);

    return result;
}

export async function handleUploadProfileImage(file: File, userName: string) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join("public", "profile", file.name);
    await writeFile(path, buffer);

    const pathToPut = `/profile/${file.name}`;

    const result = await uploadImage(userName, pathToPut);

    return result;
}