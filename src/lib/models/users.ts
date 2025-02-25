import mongoose, { ObjectId } from "mongoose";

export interface IUser {
  id: ObjectId,
  email: String,
  password: String,
  name: String,
  posts: ObjectId[],
  createdAt: Date
}

export interface IPost {
  id: ObjectId,
  userName: String,
  title: String,
  content: String,
  createdAt: Date
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      unique: true
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }],
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }
);

const PostSchema = new mongoose.Schema<IPost>({
  userName: {
    type: String,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}
);

// Creating a mongoose model for the todo document
const User = mongoose.models?.User || mongoose.model("User", UserSchema);
const Post = mongoose.models?.Post || mongoose.model("Post", PostSchema)
export default { User, Post };