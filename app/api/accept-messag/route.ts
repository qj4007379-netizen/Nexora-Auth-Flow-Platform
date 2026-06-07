import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export async function POST(request: Request) {
  await dbConnect();

  // Dynamic import to handle next-auth v5 beta.30
  const { getServerSession } = await import("next-auth/next");
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const userId = user.id as string;

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true },
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user settings",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Accept messages setting updated successfully",
        updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error updating acceptMessages:", error);
    return Response.json(
      {
        success: false,
        message: "Error updating acceptMessages",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  // Dynamic import to handle next-auth v5 beta.30
  const { getServerSession } = await import("next-auth/next");
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const userId = user.id as string;

  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to retrieve user settings",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error retrieving acceptMessages:", error);

    return Response.json(
      {
        success: false,
        message: "Error retrieving acceptMessages",
      },
      { status: 500 },
    );
  }
}