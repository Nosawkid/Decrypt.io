import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


export const mailConfig = {
    service: process.env.SMTP_SERVICE, // e.g., 'gmail'
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
};