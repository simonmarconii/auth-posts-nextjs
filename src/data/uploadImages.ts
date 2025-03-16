import { connectDB } from "@/lib/db";
import users from "@/lib/models/users";

export async function uploadImage(userName: string, pathName: string) {
    await connectDB();

    console.log(userName);

    const data = pathName.split('/').filter(part => part !== '');
    let newPath;

    if(data[0] == "background"){
        newPath = await users.User.findOneAndUpdate(
            { name: userName },
            { bgImg: pathName },
            { new: true }
        )
    }else{
        newPath = await users.User.findOneAndUpdate(
            { name: userName },
            { profileImg: pathName },
            { new: true }
        )
    }

    return newPath;
}