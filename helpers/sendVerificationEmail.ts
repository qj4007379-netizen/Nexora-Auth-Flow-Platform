import { resend } from "@/lib/resend";
import { VerificationEmail } from "@/emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Create verification link using the verifyCode
    const verifyLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${verifyCode}`;
    
    await resend.emails.send({
      from: "Your App Name <noreply@yourapp.com>",
      to: email,
      subject: "Verify your email address",
      react: VerificationEmail({ username, verifyLink, email }),
    });
    return {
      success: true,
      message: "Verification email sent successfully"
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email"
    };
  }
}