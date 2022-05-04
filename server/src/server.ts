import express, { response } from 'express'
import nodemailer from 'nodemailer'
import {prisma} from  './prisma'

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "419a758b5f279f",
      pass: "e16b0ab2397f7a"
    }
  });

app.get('/',  (req, res) => {
    return res.send('Hello Matheus')
})

app.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Matheus Luz <matheus.luz12@gmail.com>',
        subject: 'Novo Feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px">`
        ]
    })
     
    return res.status(201).json({data: feedback})
})

app.listen(3333, () => {
    console.log('Runnig again')
})