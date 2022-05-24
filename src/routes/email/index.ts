import { Router } from 'express'
import { sendEmail } from './email.controller'

const router = Router()

/* Create a category */
router.post(
    '/sendEmail',
    sendEmail
)


export default router
