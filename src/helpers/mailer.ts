
import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

interface SendEmailProps {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailProps) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Save the token in the database
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Configure email transport
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Prepare email
    const domain = process.env.DOMAIN;

    if (!domain) {
      throw new Error('DOMAIN is missing from environment variables.');
    }

    const mailOptions = {
      from: 'hitesh@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY'
          ? 'Verify your email'
          : 'Reset your password',
      html: `
        <p>
          Click <a href="${domain}/verifyemail?token=${encodeURIComponent(hashedToken)}">here</a>
          to ${
            emailType === 'VERIFY'
              ? 'verify your email'
              : 'reset your password'
          }.
          <br />
          Or copy and paste this link into your browser:
          <br />
          ${domain}/verifyemail?token=${encodeURIComponent(hashedToken)}
        </p>
      `,
    };

    // Send email
    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to send email.';

    throw new Error(message);
  }
};