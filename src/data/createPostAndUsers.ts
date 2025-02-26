import { connectDB } from "@/lib/db";
import users from "@/lib/models/users";
import { RegisterSchema } from "@/lib/zod";
import bcryptjs from "bcryptjs";

export async function createPost(title: string, content: string, userName: string) {

    await connectDB();

    const newPost = await users.Post.create({
        userName,
        title,
        content
    });

    await users.User.findOneAndUpdate(
        { name: userName },
        { $push: { posts: newPost } }
    );

    return newPost;
}

export async function deletePost(id: string) {
    await connectDB();

    const postDeleted = await users.Post.deleteOne({ _id: id });

    return postDeleted;
}

// export async function createUser(name: string, email: string, password: string) {
//     try {
//         await connectDB();

//         const validatedFields = await RegisterSchema.safeParse({
//             name,
//             email,
//             password
//         });
//         if (!validatedFields.success) {
//             return {
//                 error: validatedFields.error.flatten().fieldErrors
//             };
//         }

//         const nameRepeated = await users.User.findOne({ name });
//         const emailRepeated = await users.User.findOne({ email });
//         if (nameRepeated || emailRepeated) {
//             return {
//                 error: "Email or name in use"
//             };
//         }

//         const passwordHash = await bcryptjs.hashSync(password, 10);

//         const newUser = await users.User.create({
//             name,
//             email,
//             password: passwordHash
//         })

//         return newUser;
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }