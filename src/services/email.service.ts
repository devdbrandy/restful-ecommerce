const nodemailer = require("nodemailer");

// Create product
export const sendEmail = async (data: {name: string, email: string, subject: string, message: string}): Promise<string> => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'polaktestemail@gmail.com', // add your creds for testing purposes only.
            pass: 'Polak1234!',
        },
    });

    await transporter.sendMail({
        from: data.email, // sender address
        to: "ohanka.f@seznam.cz", // list of receivers
        subject: data.subject, // Subject line
        text: data.message, // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    return "Email sent successfully"
}