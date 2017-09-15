let Admin = require('../mongo_handler/admin')
let common_js_functions=require('../common_files/js/js_functions')

module.exports= {
    addAdmin: (req, res) => {

        let email = req.body.email;
        let password = req.body.password;


        if (password === undefined || !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password)) {
            common_js_functions.responseHandler(req, res, "Password should contain minimum eight characters, at least one letter, one number and one special character")
            return;
        }

        if (email === undefined || !/\S+@\S+\.\S+/.test(email)) {
            common_js_functions.responseHandler(req, res, "Please enter valid email including @ symbol")
            return;
        }


        let admin = new Admin({

            email: email,
            password: password
        })

        admin.save((err, succees) => {
            if (err) {
                console.log(err);
                res.status(400).send({
                    "responseCode": 400,
                    "responseMessage": "Unsuccessful",
                    "response": err.message
                });

            }
            else {
                console.log("**************", succees);
                res.status(200).send({
                    "responseCode": 200,
                    "responseMessage": "Successful",
                    "response": succees
                });
            }
        });
    },


    login: (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    Admin.findOne({email: email}, {password: 1}, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: "something failed"});
        }

        else {
            if (result === null) {
                res.status(404).send({error: "Email does not exist."});
            }
            else {
                if (password === result.password) {

                            res.status(200).json({
                            responseCode: 200,
                            responseMessage: 'User has succesfully login',
                            result: result
                        });
                    }
                    else
                        res.status(404).send({error: "Your email account is not matched"});
                    }
        }
    })
}


}







