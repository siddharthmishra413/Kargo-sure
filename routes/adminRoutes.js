const routes = require('express').Router();
const mongoose = require('mongoose');

const Customer = require('../file_handler/mongo_handler/admin');
let config=require('../file_handler/config/config_dev');
let adminHandler=require('../file_handler/adminHandler/adminHandler');
// let common_js_files=require('../file_handler/common_files/js/js_routes');

let url = config.mongo_url;

mongoose.connect(url, {
    useMongoClient: true
});

routes.get('/', (req, res) => {
    res.status(200).json("connected")
})

// routes.get('/getCountries',common_js_files.getCountries );
//e
// routes.get('/getStats', common_js_files.getStates);

routes.post('/addAdmin',adminHandler.addAdmin);
routes.post('/login',adminHandler.login);

// routes.get('/createReport',user_response_handler.createReport);


module.exports = routes;