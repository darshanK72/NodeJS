import nodmailer from 'nodemailer';

export const sendEmail = async (options) => {
    const transporter = nodmailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587, // Mailtrap's secure SMTP port
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
    const mailOptions = {
        from: 'darshankhairnar72@gmail.com',
        to: options.to,
        subject: options.subject,
        text: options.text

    }
    await transporter.sendMail(mailOptions);
}