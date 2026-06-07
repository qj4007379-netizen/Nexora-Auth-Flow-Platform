import { authOptions } from "./options";
import NextAuth from "next-auth";

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export handlers for GET and POST requests
// Using explicit function wrappers to avoid Turbopack issues
export { handler as GET, handler as POST };
