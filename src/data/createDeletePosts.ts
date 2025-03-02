import { connectDB } from "@/lib/db";
import users from "@/lib/models/users";
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

    const postDeleted = await users.Post.findByIdAndDelete(id);
    if (!postDeleted) return { error: "Error to delete post" };

    await users.User.updateOne(
        { name: postDeleted.userName },
        { $pull: { posts: postDeleted._id } }
    );
    return postDeleted;
}

export async function updateUserName(name: string, newName: string) {
    await connectDB();

    const nameUsed = await users.User.findOne({ name: newName });
    if (nameUsed) return { error: "Name in use" };

    const userUpdated = await users.User.findOneAndUpdate(
        { name },
        { name: newName },
        { new: true }
    )
    if (!userUpdated) return { error: "Error to update user name" };

    await users.Post.updateMany(
        { userName: name },
        { userName: newName }
    )

    return userUpdated;
}

export async function updateUserEmail(name: string, newEmail: string) {
    await connectDB();

    const emailUsed = await users.User.findOne({ email: newEmail });
    if (emailUsed) return { error: "Email in use" };

    const userUpdated = await users.User.findOneAndUpdate(
        { name },
        { email: newEmail },
        { new: true }
    )
    if (!userUpdated) return { error: "Error to update user email" };

    return userUpdated;
}

export async function updateUserPassword(userName: string, oldPwd: string, newPwd: string) {
    await connectDB();

    if (oldPwd === newPwd) return { error: "Same passwords" };

    const userFind = await users.User.findOne({ name: userName });
    if (!userFind) return { error: "Error to update user password" };

    const matchPwd = await bcryptjs.compare(oldPwd, userFind.password);
    if (!matchPwd) return { error: "Wrong old password" };
    const hashNewPwd = await bcryptjs.hashSync(newPwd, 10);

    const userUpdated = await users.User.findOneAndUpdate(
        { password: userFind.password },
        { password: hashNewPwd },
        { new: true }
    )
    if (!userUpdated) return { error: "Error to update user password" };

    return userUpdated;
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