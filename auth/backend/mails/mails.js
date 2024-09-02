import { verificationCodeTemplate } from './mailTemplates.js';
import { client, sender } from './mailtrap.js';

export const sendVerificationCode = async(userMail, verificationToken)=> {
    userMail = [
        {
            email: userMail
        }
    ]
    client.send({
        from: sender,
        to: userMail,
        subject: "Confirm your authorization",
        html: verificationCodeTemplate.replace("{verificationCode}", verificationToken),
        category: "Sending Verification Mail"
    }).then((res) => {
        console.log(res);
    }).catch((e) => {
        console.log(`Error: ${e}`);
    })
}

export const sendVerificationMail = async(userMail, userName)=> {
    userMail = [
        {
            email: userMail
        }
    ]
    client.send({
        from: sender,
        to: userMail,
        template_uuid: "d7052079-59a9-48da-95da-54e6ef849fc4",
        template_variables: {
            "name": userName
        }
    }).then((res) => {
        console.log(res);
    }).catch((e) => {
        console.log(`Error: ${e}`);
        throw new Error("Error sending verification email:", e);
    })
}