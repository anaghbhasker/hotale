import { default as Twilio } from 'twilio'
import * as dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const serviceId= process.env.SERVICESID

export async function otpSend(phone){
    const client=Twilio(accountSid, authToken);

    client.verify.v2.services(serviceId)
    .verifications.create({ to: `+91${phone}`, channel: "sms" })
    .then((verification) => console.log(verification.status))
    .catch((error) => console.log(error.message));
}

export  function otpVerify(phone,otp){
    
    const client = Twilio(accountSid, authToken);
    return new Promise((resolve, reject) => {
        client.verify.v2
            .services(serviceId)
            .verificationChecks.create({ to: `+91${phone}`, code: otp })
            .then((verification_check) => {
                resolve(verification_check.status);
            })
            .catch((error) => reject(error.status));
        });
}