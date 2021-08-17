const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_KEY)

const sendwelcomeemail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'aaditikapre02@gmail.com',
        subject: 'Thank you for choosing us!',
        text:`Welcome to the app, ${name} ! We look forward to sharing your experience with us.`
    
    })
}
const sendcancelemail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'aaditikapre02@gmail.com',
        subject: 'Your subscription has been cancelled',
        text:`We regret your absense, ${name} ! Do share your reason of cancellation to help us improve, We will try our best to improve your experience. All your data is safe with us.`
    
    })
}
module.exports= {
    sendwelcomeemail, sendcancelemail
}
