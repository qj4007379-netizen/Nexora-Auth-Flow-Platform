import nextAuth from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/options";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
    };
  }
}

const auth = nextAuth(authOptions);

export { auth, authOptions };