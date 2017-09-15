let Vendor = require('../mongo_handler/Vendor')
let common_js_functions = require('../common_files/js/js_functions')

module.exports = {
    addVendor: (req, response) => {
        let vendorName = req.body.vendorName;
        let email = req.body.email;
        let country = req.body.country;
        let state = req.body.state;
        let telephone_no = req.body.telephone_no;
        let region = req.body.region;

        if (vendorName === undefined || !/^[A-Za-z ]{2,20}$/.test(vendorName)) {
            common_js_functions.responseHandler(req, response, "Please enter first name between 3-30 characters only")
            return;
        }

        if (email === undefined || !/\S+@\S+\.\S+/.test(email)) {
            common_js_functions.responseHandler(req, response, "Please enter valid email including @ symbol")
            return;

        }

        if (telephone_no === undefined || !/^[0-9]{10,14}$/.test(telephone_no)) {
            common_js_functions.responseHandler(req, response, "Only numeric value is allowed(10-14 digits only)")
            return;
        }

        if (region === undefined || !['north', 'south', 'east', 'west'].includes(region)) {
            common_js_functions.responseHandler(req, response, "Please enter the your region(north,south,east,west)")
            return;
        }

        let vendor = new Vendor({
            vendorName: vendorName,
            email: email,
            address: {
                country: country,
                state: state,
            },
            telephone_no: telephone_no,
            region: region
        });

        vendor.save((err, succees) => {
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
    editVendor: (req, res) => {
        console.log(req.body)
        let criteria = req.body.emailId;

        let vendorName = req.body.vendorName;
        let email = req.body.email;
        let country = req.body.country;
        let state = req.body.state;
        let telephone_no = req.body.telephone_no;
        let blocked = req.body.blocked;
        let region = re.body.region;
        let emailCriteria = req.body.emailToFind;

        let setValue = {};
        setValue.address = {};
        if (vendorName !== undefined && /^[A-Za-z]{2,20}$/.test(vendorName)) {
            setValue.vendorName = vendorName
        }

        if (email !== undefined && /\S+@\S+\.\S+/.test(email)) {

            common_js_functions.responseHandler(req, res, "Email cannot be altered");
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

        if (region !== undefined && ['north', 'south', 'east', 'west'].includes(region)) {
            setValue.region = region
        }
        if (blocked !== undefined && [true, false].includes(blocked)) {
            setValue.blocked = blocked
        }
        console.log(setValue)
        Vendor.findOneAndUpdate({email: criteria}, {$set: setValue}, {new: true}, (err, succees) => {
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
    getVendors: (req, res) => {
        Vendor.find({}, (err, success) => {
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
    blockVendor: (req, res) => {
        let emailCriteria = req.body.email;
        console.log("777777777", req.body.email);
        if (emailCriteria === undefined || !/\S+@\S+\.\S+/.test(emailCriteria)) {
            common_js_functions.responseHandler(req, res, "Please enter emailId of Vendor to block");
            return;
        }
        Vendor.findOne({email: emailCriteria}, (error, success) => {
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
                        "response": "No Vendor found"
                    });
                }
                else {
                    if (success.blocked) {
                        Vendor.findOneAndUpdate({email: emailCriteria}, {blocked: false}, {new: true}, (err, succeed) => {
                            if (err) {
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
                        Vendor.findOneAndUpdate({email: emailCriteria}, {blocked: true}, {new: true}, (err, succeed) => {

                            if (err) {
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


    getVendorData: (req, res) => {
        let blocked = req.query.blocked;
        if (blocked == 1) {
            console.log("hohh")
            Vendor.aggregate({
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
            Vendor.aggregate(
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
};
