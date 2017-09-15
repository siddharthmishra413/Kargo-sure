const routes = require('express').Router();
const mongoose = require('mongoose');

const Vendor = require('../file_handler/mongo_handler/Vendor');
let config=require('../file_handler/config/config_dev');
let vendor_response_handler=require('../file_handler/vendor_handler/vendor_response_handler');
let common_js_files=require('../file_handler/common_files/js/js_routes');

let url = config.mongo_url;

mongoose.connect(url, {
    useMongoClient: true
});


routes.get('/', (req, res) => {
    res.status(200).json("connected")
})

routes.get('/getCountries',common_js_files.getCountries );

routes.get('/getStates', common_js_files.getStates);

routes.post('/addVendor',vendor_response_handler.addVendor );

routes.post('/editVendor',vendor_response_handler.editVendor);

routes.post('/blockVendor',vendor_response_handler.blockVendor);

routes.get('/getVendors',vendor_response_handler.getVendors);

routes.get('/getVendorData',vendor_response_handler.getVendorData);

// routes.get('/createReport',vendor_response_handler.createReport);


module.exports = routes;