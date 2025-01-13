const express = require('express')
require('dotenv').config();
const app = express()
const { TWILIO_ACCOUNT_SID , TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID} = process.env
const twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/validation/:phone', async (req , res) => {
  const {phone} = req.params
  try{twilioClient.verify.v2.services(TWILIO_SERVICE_SID).verifications.create({
    to: `${phone}`,
    channel: 'sms'
  }).then(verification => console.log(verification))
  .then(res.sendStatus(201))
}catch(error){
    console.log(error)
  }
})

app.post('/validation/check/:phone/:code', async (req, res) => {
const {phone, code} = req.params
try{ twilioClient.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verificationChecks.create({
      code: `${code}`,
      to: `${phone}`,
    })
    .then(verification => console.log(verification.status))
    .then(res.sendStatus(201))
  }catch(error){
    console.log(error)
  }
})

app.listen(3009, ()=>{
  console.log(`Listening 3009`)
})