import { client, sender } from './mailtrap.js';

export const sendVerificationMail = async(userMail)=> {
    userMail = [
        {
            email: userMail
        }
    ]
    client.send({
        from: sender,
        to: userMail,
        subject: "Confirm your authorization",
        text: "Congrats for sending email with Mailtrap!",
        category: "Integration Test"
    }).then((res) => {
        console.log(res);        
    }).catch((e) => {
        console.log(`Error: ${e}`);
    })
}