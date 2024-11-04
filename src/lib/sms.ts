// src/lib/sms.ts

import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export const sendSMSNotification = async (
  toPhoneNumber: string,
  content: string
) => {
  try {
    const message = await client.messages.create({
      body: content,
      to: toPhoneNumber,
      from: twilioPhoneNumber,
    });

    return message;
  } catch (error) {
    console.error("An error occurred while sending SMS:", error);
    throw error;
  }
};
