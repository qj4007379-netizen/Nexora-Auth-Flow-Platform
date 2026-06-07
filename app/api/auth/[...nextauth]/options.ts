import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const identifier = credentials?.identifier as string;
        const password = credentials?.password as string;
        
        if (!identifier || !password) {
          throw new Error("Email/username and password are required");
        }

        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: identifier },
              { username: identifier },
            ],
          });
          if (!user) {
            throw new Error("No user found with the given email or username");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your email to login");
          }
          const isPasswordCorrect: boolean = await bcrypt.compare(
            password,
            user.password,
          );
          if (isPasswordCorrect) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.username,
              isVerified: user.isVerified,
              isAcceptingMessages: user.isAcceptingMessages,
            };
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err) {
          throw new Error(err instanceof Error ? err.message : String(err));
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
