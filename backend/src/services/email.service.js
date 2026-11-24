import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
    const { data, error } = await resend.emails.send(
        {
            from: process.env.MAIL_FROM,
            to,
            subject,
            html,
        }
    );

    if (error) {
        throw new Error(error.message);
    }

    return data;
};