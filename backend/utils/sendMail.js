import { mailConfig } from "../configs/nodemailer.js";
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport(mailConfig)

export const sendWelcomeEmail = async (email, username, agentId) => {
    await transporter.verify()
    const mailOptions = {
        from: "Decrypt.io HQ",
        to: email,
        subject: `CLASSIFIED: Your Agent Credentials Enclosed`,
        html: `<div style="font-family: monospace; background-color: #000; color: #0f0; padding: 20px;">
          <h1>WELCOME, ${username}</h1>
          <p>Your Agent ID is: <strong>${agentId}</strong></p>
        </div>`
    }
    const info = await transporter.sendMail(mailOptions)
    console.log("Transmission sent: %s", info.messageId);
    return info
}