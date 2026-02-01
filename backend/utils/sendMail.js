import { mailConfig } from "../configs/nodemailer.js";
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport(mailConfig)

export const sendWelcomeEmail = async (email, username, agentId) => {
  await transporter.verify()
  // const mailOptions = {
  //     from: "Decrypt.io HQ",
  //     to: email,
  //     subject: `CLASSIFIED: Your Agent Credentials Enclosed`,
  //     html: `<div style="font-family: monospace; background-color: #000; color: #0f0; padding: 20px;">
  //       <h1>WELCOME, ${username}</h1>
  //       <p>Your Agent ID is: <strong>${agentId}</strong></p>
  //     </div>`
  // }
  const mailOptions = {
    from: `"Decrypt.io HQ" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `CLASSIFIED: New Agent Identity Assigned`,
    html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Courier New', Courier, monospace;">
            
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000; width: 100%;">
                <tr>
                    <td align="center" style="padding: 20px;">
                        
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; border: 1px solid #333333; background-color: #050505;">
                            
                            <tr>
                                <td style="padding: 20px; border-bottom: 1px solid #333333; background-color: #0a0a0a;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="color: #22c55e; font-size: 12px; font-weight: bold; letter-spacing: 2px;">
                                                // SECURE_TRANSMISSION
                                            </td>
                                            <td align="right" style="color: #666666; font-size: 10px; letter-spacing: 1px;">
                                                ENCRYPTION: AES-256
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 40px 30px;">
                                    
                                    <div style="margin-bottom: 20px;">
                                        <span style="border: 1px solid #ef4444; color: #ef4444; font-size: 10px; padding: 4px 8px; letter-spacing: 1px; font-weight: bold;">
                                            TOP SECRET // EYES ONLY
                                        </span>
                                    </div>

                                    <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 10px 0; letter-spacing: -1px;">
                                        WELCOME, AGENT ${username.toUpperCase()}
                                    </h1>
                                    <p style="color: #999999; font-size: 14px; line-height: 1.5; margin-bottom: 30px;">
                                        Your application to the network has been accepted. Below are your assigned credentials for field operations.
                                    </p>

                                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #001a09; border: 1px dashed #22c55e; margin-bottom: 30px;">
                                        <tr>
                                            <td align="center" style="padding: 25px;">
                                                <p style="color: #22c55e; font-size: 10px; letter-spacing: 2px; margin: 0 0 10px 0; text-transform: uppercase;">
                                                    Assigned Agent ID
                                                </p>
                                                <div style="color: #ffffff; font-size: 20px; font-weight: bold; letter-spacing: 1px; text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);">
                                                    ${agentId}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="color: #666666; font-size: 12px; line-height: 1.4; border-left: 2px solid #333333; padding-left: 15px;">
                                        <strong style="color: #ffffff;">DIRECTIVE:</strong> Use this ID to access the main terminal. Do not disclose this identifier to civilians.
                                    </p>

                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 20px; background-color: #0a0a0a; border-top: 1px solid #333333; color: #444444; font-size: 10px; text-align: center;">
                                    <p style="margin: 0 0 5px 0;">DECRYPT.IO HEADQUARTERS</p>
                                    <p style="margin: 0;">
                                        <span style="color: #22c55e;">● SYSTEM ONLINE</span> &nbsp;|&nbsp; 
                                        TRACKING ID: ${Date.now().toString(36).toUpperCase()}
                                    </p>
                                </td>
                            </tr>
                        </table>
                        
                        <p style="color: #333333; font-size: 10px; margin-top: 20px;">
                            This message will not self-destruct (unfortunately).
                        </p>

                    </td>
                </tr>
            </table>
        </body>
        </html>
        `
  };
  const info = await transporter.sendMail(mailOptions)
  console.log("Transmission sent: %s", info.messageId);
  return info
}