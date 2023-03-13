import nodemailer from 'nodemailer'

export async function sendMail(email,subject,text){
    try {
        const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			service: "gmail",
			port: Number(587),
			secure: Boolean(true),
			auth: {
				user: "anaghbhasker@gmail.com",
				pass: "sozdmzwgzemfkdhs",
			},
		});

		await transporter.sendMail({
			from: "anaghbhasker@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
		console.log(error);
		return error;
    }
}