import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  Content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  Content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifiedCode: string;
  verificationCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  Messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, required: [true, "Password is required"] },
  verifiedCode: {
    type: String,
    required: [true, "Verification status is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCodeExpiry: { type: Date },
  isAcceptingMessages: { type: Boolean, default: true },
  Messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;
