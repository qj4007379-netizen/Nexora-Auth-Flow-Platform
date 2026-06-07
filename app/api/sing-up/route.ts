import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import UserModel from "@/model/user";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 },
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      // User already exists, return error
      return Response.json(
        {
          success: false,
          message: "User already exists with this email",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour from now

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      isAcceptingMessages: true,
      verifiedCode: Math.floor(100000 + Math.random() * 900000).toString(),
      verificationCodeExpiry: expiryDate,
      Messages: [],
    });

    await newUser.save();

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      newUser.verifiedCode,
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Failed to send verification email",
        },
        { status: 500 },
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in sign-up route:", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
