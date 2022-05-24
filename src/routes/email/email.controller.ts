import * as emailService from '../../services/email.service'
import { Request } from '../../helpers/constants'
import { Response } from 'express'


export const sendEmail = async (req: Request, res: Response) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    }
    console.log(data)
    try {
        const emailResponse = await emailService.sendEmail(data)
        res.status(201).json(emailResponse)
    } catch (error) {
        res.status(500).json(error)
    }
}
