import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

// Debugging: Log the domain value to ensure it's correctly set
console.log("Domain used for email links:", domain);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  // Debugging: Log the input values
  console.log("Sending 2FA email to:", email);
  console.log("2FA Token:", token);

  try {
    const response = await resend.emails.send({
      from: 'no-reply@databayt.org',
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA code: ${token}</p>`,
    });
    
    // Debugging: Log the response from Resend API
    console.log("2FA email sent successfully, response:", response);
  } catch (error) {
    // Debugging: Log the error if sending email fails
    console.error("Error sending 2FA email:", error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  // Debugging: Log the reset link to ensure it's correctly built
  console.log("Password reset link:", resetLink);

  try {
    const response = await resend.emails.send({
      from: 'no-reply@databayt.org',
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    });

    // Debugging: Log the response from Resend API
    console.log("Password reset email sent successfully, response:", response);
  } catch (error) {
    // Debugging: Log the error if sending email fails
    console.error("Error sending password reset email:", error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  // Debugging: Log the confirmation link to ensure it's correctly built
  console.log("Email confirmation link:", confirmLink);

  try {
    const response = await resend.emails.send({
      from: 'support@databayt.org',
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
      text: `Click the following link to confirm your email: ${confirmLink}`
    });

    // Debugging: Log the response from Resend API
    console.log("Verification email sent successfully, response:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  }
};

export const sendEmailNotification = async (
  toEmail: string,
  subject: string,
  content: string
) => {
  try {
    // Send the email using Resend
    const response = await resend.emails.send({
      from: 'no-reply@databayt.org',  // Replace with your verified sender email
      to: toEmail,
      subject: subject,
      html: `<p>${content}</p>`,  // Use HTML content for better formatting
    });

    // Log the response for debugging
    console.log("Notification email sent successfully, response:", response);
    return response;
  } catch (error) {
    console.error("An error occurred while sending email notification:", error);
    throw error;
  }
};
