import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export async function GET(request: Request) {
  await dbConnect();
  
  // Dynamic import to handle next-auth v5 beta.30
  const { getServerSession } = await import("next-auth/next");
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  try {
    const foundUser = await UserModel.findById(session.user.id);
    
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const messages = foundUser.Messages || [];

    return Response.json(
      {
        success: true,
        messages: messages,
      },
      { status: 200 },
    );

  } catch (error) {
    console.log("Error fetching user messages:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching user messages",
      },
      { status: 500 },
    );
  }
}