import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

import { Message } from "@/model/user";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, content } = await request.json();
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        { success: false, message: "User is not accepting messages" },
        { status: 400 },
      );
    }

    const newMessage: Message = {
      Content: content,
      createdAt: new Date(),
    };

    user.Messages.push(newMessage);
    await user.save();
    return Response.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
