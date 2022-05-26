const nodemailer = require("nodemailer");
   
    var transport = nodemailer.createTransport({
          service: 'gmail',

        auth: {
            user: "benhadjalinada@gmail.com",
            pass: "1234Nada",
        }
    });

exports.contactUs=(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "benhadjalinada@gmail.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
    };

    transport.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "Message Sent" });
        }
    });
};

exports.sendQuiz = (req, res) => {

      const to = req.body.to;


    const message = {
      from: "benhadjalinada@gmail.com", // Sender address
      to: to, // List of recipients
      subject: "nouveau offre  ", // Subject line
      //html: "<h1>lien quiz</h1>"+"<a href=http://localhost:8000/dashboard/quizs/"+req.params.id+"> Click here</a>",
      text:"nouveau offre a été ajouter"
    };

    transport.sendMail(message, (err, info)=> {
        if (err) {
            console.log(err);
        }
        res.status(200).send({ message: "mail send" });
    });
}
