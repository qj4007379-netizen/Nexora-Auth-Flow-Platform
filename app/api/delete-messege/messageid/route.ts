import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "@/types/user";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } },
) {
  const messageId = params.messageid;

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
    const updateRessult = await UserModel.updateOne(
      { _id: session.user.id },
      { $pull: { Messages: { id: messageId } } },
    );

    if (updateRessult.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          messages: "Message not found message all ready deleted",
        },
        { status: 404 },
      );

      return Response.json(
        {
          success: true,
          messages: "Message deleted successfully",
        },
        { status: 200 },
      );
    }
  } catch (error) {
        return Response.json(
      {
        success: false,
        messages: "An error occurred while deleting the message",
      },
      { status: 500 },
    );
  }
}
