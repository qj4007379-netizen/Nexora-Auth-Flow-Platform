import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Error checking user not found",
        },
        { status: 500 },
      );
    }

    const isCodeValid = user.verifiedCode === code;
    const isCodeNotExpired = new Date(user.verificationCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        {
          status: 200,
        },
      );
    } else if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "verification code is expired please request a new one",
        },
        { status: 400 },
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 400 },
      );
    }

  } catch (error) {
    console.error("Error checking username availability:", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username availability",
      },
      { status: 500 },
    );
  }
}
