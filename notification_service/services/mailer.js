import nodemailer from "nodemailer"
import config from "../config/config.js"
import ejs from "ejs"
import path from "path"

const __dirname = process.cwd()


export const mailTypes = {
    custom: "custom",
    disaster_alert: "disaster_alert",
    forget_password: "forget_password",
    newsletter: "newsletter",
    onboarding: "onboarding",
    verification: "verification",
}

const getPath = fileName =>{
    return path.join(__dirname, `/templates/${fileName}.ejs`)
}

class Mailer{
    constructor(){
        this.transporter = nodemailer.createTransport({
            ...config.mail
        })
        // this.from_address = config.mail.auth.user
        this.from_address = "tester@gmail.com"
    }

    loadTemplate(path, data){
        return ejs.renderFile(path, data)
    }

    sendMail(email, html){
        return this.transporter.sendMail({
            to: email,
            from: this.from_address,
            html
        })
    }

    async sendCustom(email, data){
        return this.sendMail(email,await this.loadTemplate(getPath(mailTypes.custom), data))
    }

    async sendDisasterAlert(email, data){
        return this.sendMail(email,await this.loadTemplate(getPath(mailTypes.disaster_alert), data))
    }

    async sendForgetPassword(email, data){
        return this.sendMail(email,await this.loadTemplate(getPath(mailTypes.forget_password), data))
    }

    async sendOnboarding(email){
        return this.sendMail(email,await this.loadTemplate(getPath(mailTypes.onboarding), {}))
    }

    async sendVerification(email, data){
        return this.sendMail(email, await this.loadTemplate(getPath(mailTypes.verification), data))
    }

}

export default Object.freeze(new Mailer())