const http = require('http');
const nodemailer = require('nodemailer')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
}
const configuredCors = cors(corsOptions)

const port = 8585;
const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({extended: false})

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    secureConnection: false,
    auth: {
        user: 'Bantengccul@gmail.com',
        pass: 'rmql aclp ozkf rrok'
    },
    tls: {
        rejectUnauthorized: true
    }
});


//handle form submit

app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.options('*',configuredCors)
app.post('/send-email', configuredCors,(req, res) => {
    console.log(req.body);
    let mailData = req.body;
    const mailOptions = {
        // from: mailData.email,
        replyTo: 'user@gmail.com',
        to: 'Bantengccul@gmail.com',
        subject: 'Bantengccul',
        text: `first Name: ${mailData.first_name}\nlast Name: ${mailData.last_name}\n\nEmail: ${mailData.email}\n\nMessage: ${mailData.message}`
    };

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error) {
            console.log(error);
            res.json({message: 'error', error: error, state: false})

        }
        else {
            console.log('email sent', info)
            res.json({message: 'received', state: true})
            
        }
    })
    // console.log('hello');
    // res.json({message: 'received'})
})

app.listen(port, ()=>{
    console.log('server running....')
})
