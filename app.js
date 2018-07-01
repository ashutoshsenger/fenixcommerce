const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

  //router object
  var router = express.Router();

const app = express();
//view engine setup

app.set('view engine','ejs');
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//static folder
app.use('/public',express.static(path.join(__dirname,'public')));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res) => {
 res.render('contact');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.post('/send',(req,res)=>{
  console.log('THIS SHOWS THAT /send endpoint is processing now');
  const output =`
   <p>you have a new message</p>
      <h3>
       <ul>
        <li>Name:${req.body.name}</li>
        <li>Company:${req.body.company}</li>
        <li>Email:${req.body.emailaddress}</li>
       </ul>
      </h3>
  `;
// var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ashutoshsenger09@gmail.com',
    pass: '09091998ashu'
  }
});

var mailOptions = {
  from: 'ashutoshsenger09@gmail.com',
  to: 'ashutoshsenger09@gmail.com,akshat@qerver.com',
  subject: 'Sending Email using Node.js',
  text: 'That is a the email which is being sent by using nodemailer',
  html: output
};

transporter.sendMail(mailOptions, function(error, info){
  if (error){
    console.log(error);
  } else {
     // res.render('contact',{msg:'Email has been sent!!'});
     res.redirect('/#contact-form');
  }
});

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '/views/contact.handlebars'));
 });

  module.exports = router;

});

app.listen(3000,()=> console.log('server started'));
