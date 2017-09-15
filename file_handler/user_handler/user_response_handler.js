let User = require('../mongo_handler/User')
let common_js_functions = require('../common_files/js/js_functions')

module.exports = {
    addUser: (req, response) => {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let dob = req.body.dob;
        let country = req.body.country;
        let state = req.body.state;
        let telephone_no = req.body.telephone_no;
        let gender = req.body.gender;
        let region = req.body.region;

        if (firstname === undefined || !/^[A-Za-z]{2,20}$/.test(firstname)) {
            common_js_functions.responseHandler(req, response, "Please enter first name between 3-30 characters only")
            return;
        }
        if (lastname === undefined || !/^[A-Za-z]{2,20}$/.test(lastname)) {
            common_js_functions.responseHandler(req, response, "Please enter last name between 3-30 characters only")
            return;

        }
        if (email === undefined || !/\S+@\S+\.\S+/.test(email)) {
            common_js_functions.responseHandler(req, response, "Please enter valid email including @ symbol")
            return;

        }
        if (dob === undefined || !common_js_functions.dateValidation(dob)) {
            common_js_functions.responseHandler(req, response, "Age range should be between 18-60")
            return;
        }
        if (telephone_no === undefined || !/^[0-9]{10,14}$/.test(telephone_no)) {
            common_js_functions.responseHandler(req, response, "Only numeric value is allowed(10-14 digits only)")
            return;
        }
        if (gender === undefined || !['male', 'female'].includes(gender)) {
            common_js_functions.responseHandler(req, response, "Please select your gender male or female")
            return;
        }
        if (region === undefined || !['north', 'south', 'east', 'west'].includes(region)) {
            common_js_functions.responseHandler(req, response, "Please enter the your region(north,south,east,west)")
            return;
        }

        let user = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            address: {
                country: country,
                state: state,
            },
            telephone_no: telephone_no,
            dob: dob,
            gender: gender,
            region:region
        });

        user.save((err, succees) => {
            if (err) {
                console.log(err);
                response.status(400).send({
                    "responseCode": 400,
                    "responseMessage": "Unsuccessful",
                    "response": err.message
                });

            }
            else {
                console.log("**************", succees);
                response.status(200).send({
                    "responseCode": 200,
                    "responseMessage": "Successful",
                    "response": succees
                });
            }
        });
    },
    editUser: (req, res) => {
        console.log(req.body)
        let criteria = req.body.emailId;

        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let dob = req.body.dob;
        let country = req.body.country;
        let state = req.body.state;
        let telephone_no = req.body.telephone_no;
        let gender = req.body.gender;
        let blocked = req.body.blocked;
        let region = re.body.region;
        let emailCriteria = req.body.emailToFind;

        let setValue = {};
        setValue.address = {};
        if (firstname !== undefined && /^[A-Za-z]{2,20}$/.test(firstname)) {
            setValue.firstname = firstname
        }
        if (lastname !== undefined && /^[A-Za-z]{2,20}$/.test(lastname)) {
            setValue.lastname = lastname
        }
        if (email !== undefined && /\S+@\S+\.\S+/.test(email)) {

            common_js_functions.responseHandler(req, res, "Email cannot be altered");
        }
        if (dob !== undefined && common_js_functions.dateValidation(dob)) {
            setValue.dob = dob
        }
        if (country !== undefined) {
            setValue.address.country = country
        }
        if (state !== undefined) {
            setValue.address.state = state
        }
        if (telephone_no !== undefined && /^[0-9]{10,14}$/.test(telephone_no)) {
            setValue.telephone_no = telephone_no
        }
        if (gender !== undefined && ['male', 'female'].includes(gender)) {
            setValue.gender = gender
        }
        if (region !== undefined && ['north', 'south', 'east', 'west'].includes(region)) {
            setValue.region = region
        }
        if (blocked !== undefined && [true, false].includes(blocked)) {
            setValue.blocked = blocked
        }
        console.log(setValue)
        User.findOneAndUpdate({email: criteria}, {$set: setValue}, {new: true}, (err, succees) => {
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
        })


    },
    getUsers: (req, res) => {
        User.find({}, (err, success) => {
            if (err) {
                console.log(err);
                res.status(400).send({
                    "responseCode": 400,
                    "responseMessage": "Unsuccessful",
                    "response": err.message
                });
            }
            else {
                console.log("**************", success);
                res.status(200).send({
                    "responseCode": 200,
                    "responseMessage": "Successful",
                    "response": success
                });
            }
        })

    },
    blockUser: (req, res) => {
        let emailCriteria = req.body.email;
        console.log("777777777", req.body.email);
        if (emailCriteria === undefined || !/\S+@\S+\.\S+/.test(emailCriteria)) {
            common_js_functions.responseHandler(req, res, "Please enter emailId of user to block");
            return;
        }
        User.findOne({email: emailCriteria}, (error, success) => {
            if (error) {
                console.log(error);
                res.status(400).send({
                    "responseCode": 400,
                    "responseMessage": "Unsuccessful",
                    "response": error.message
                });

            }
            else {
                console.log("**************", success);
                if (success === null) {
                    res.status(404).send({
                        "responseCode": 404,
                        "responseMessage": "Unsuccessful",
                        "response": "No user found"
                    });
                }
                else {
                    if (success.blocked) {
                        User.findOneAndUpdate({email: emailCriteria}, {blocked: false}, {new: true}, (err, succeed) => {
                                if(err) {
                                    console.log(err);
                                    res.status(400).send({
                                        "responseCode": 400,
                                        "responseMessage": "Unsuccessful",
                                        "response": err.message
                                    });
                                }
                                else {
                                    console.log(succeed);
                                    res.status(200).send({
                                        "responseCode": 200,
                                        "responseMessage": "Successful",
                                        "response": succeed
                                    });
                                }
                        })
                    }
                    else {
                        User.findOneAndUpdate({email: emailCriteria}, {blocked: true}, {new: true}, (err, succeed) => {

                            if(err) {
                                console.log(err);
                                res.status(400).send({
                                    "responseCode": 400,
                                    "responseMessage": "Unsuccessful",
                                    "response": err.message
                                });
                            }
                            else {
                                console.log(succeed);
                                res.status(200).send({
                                    "responseCode": 200,
                                    "responseMessage": "Successful",
                                    "response": succeed
                                });
                            }
                        })
                    }

                }

            }
        })

    },
    getUserData: (req, res) => {
        let blocked = req.query.blocked;
        if (blocked == 1) {
            User.aggregate({
                    $match: {
                        blocked: true
                    }
                },
                {
                    $group: {
                        _id: null,
                        count: {$sum: 1}
                    }
                }, (err, success) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({
                            "responseCode": 400,
                            "responseMessage": "Unsuccessful",
                            "response": err.message
                        });
                    }
                    else {
                        console.log("**************", success);
                        res.status(200).send({
                            "responseCode": 200,
                            "responseMessage": "Successful",
                            "response": success
                        });
                    }
                })
        }
        else {
            User.aggregate(
                {
                    $group: {
                        _id: null,
                        count: {$sum: 1}
                    }
                }, (err, success) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({
                            "responseCode": 400,
                            "responseMessage": "Unsuccessful",
                            "response": err.message
                        });
                    }
                    else {
                        console.log("**************", success);
                        res.status(200).send({
                            "responseCode": 200,
                            "responseMessage": "Successful",
                            "response": success
                        });
                    }
                })
        }
    }


// createReport: (req, res) => {
    //
    //     require("jsreport").render("<h1>Hello world</h1>").then(function (out) {
    //         //pipe pdf with "Hello World"
    //         console.log(out)
    //         res.set('Content-type', 'application/pdf');
    //         res.send(out.content)
    //     });
    // }
};
