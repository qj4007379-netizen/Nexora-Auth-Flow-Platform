import * as React from "react";

interface VerificationEmailProps {
  username: string;
  verifyLink: string;
  email: string;
}

export const VerificationEmail = ({ username, verifyLink, email }: VerificationEmailProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
        <style>
          {`
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #334155;
              background-color: #f8fafc;
            }
            .verify-button {
              display: inline-block;
              background-color: #2563eb;
              color: #ffffff;
              padding: 16px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3), 0 2px 4px -1px rgba(37, 99, 235, 0.2);
              transition: all 0.2s ease;
              border: none;
              cursor: pointer;
            }
            .verify-button:hover {
              background-color: #1d4ed8;
              transform: translateY(-1px);
              box-shadow: 0 6px 12px -2px rgba(37, 99, 235, 0.4), 0 3px 6px -2px rgba(37, 99, 235, 0.3);
            }
            .link-text {
              word-break: break-all;
              font-family: monospace;
              color: #2563eb;
              font-size: 14px;
              margin: 0;
            }
          `}
        </style>
      </head>
      <body>
        <div className="max-w-[600px] mx-auto bg-white rounded-2xl overflow-hidden shadow-[0_10px_25px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
          {/* Header */}
          <div className="bg-blue-600 text-white text-center p-10">
            <h1 className="text-3xl font-bold tracking-tight m-0">Welcome to Message!</h1>
            <p className="mt-2 text-lg opacity-90 font-normal m-0">Verify your email address to get started</p>
          </div>

          {/* Main Content */}
          <div className="p-10">
            <div className="mb-6">
              <p className="text-xl font-semibold text-slate-800 m-0">Assalamu Alaikum {username},</p>
            </div>

            <div className="mb-8">
              <p className="text-base text-slate-600 m-0">
                Thank you for signing up! To complete your registration and start using Message, 
                please verify your email address by clicking the button below.
              </p>
            </div>

            {/* Verification Button */}
            <div className="text-center mb-8">
              <a href={verifyLink} className="verify-button">
                Verify Your Email Address
              </a>
            </div>

            <div className="mb-8 p-5 bg-slate-50 rounded-lg">
              <p className="text-sm font-semibold text-slate-600 m-0 mb-2">Or copy and paste this link into your browser:</p>
              <p className="link-text">{verifyLink}</p>
            </div>

            {/* Security Note */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800 m-0 mb-2">
                <strong>Security Note:</strong> This verification link will expire in 24 hours for your security.
              </p>
              <p className="text-sm text-amber-800 m-0">
                If you didn't create an account with us, please ignore this email.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-slate-50 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500 m-0 mb-4">
              Best regards,<br />
              The Message Team
            </p>
            <div className="h-px bg-slate-200 mb-4"></div>
            <p className="text-xs text-slate-400 m-0 mb-2">
              This is an automated message, please do not reply to this email.
            </p>
            <p className="text-xs text-slate-400 m-0">
              If you continue to have problems, please contact our support team.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}