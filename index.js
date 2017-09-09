const express = require('express')
const body_parser = require('body-parser');
const path=require('path')
let user_routes=require('./routes/user_routes');
let vendor_routes=require('./routes/vendor_routes');
let adminRoutes=require('./routes/adminRoutes');
let common_js_files=require('./file_handler/common_files/js/js_routes');

let config=require('./file_handler/config/config_dev')
let db_status=require('./file_handler/config/config_dev')
let port = process.env.PORT || config.server_port;

const app = express();

app.use(body_parser.json());

app.use(body_parser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'assests')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// app.get('*',common_js_files.serveAngularPage)

app.use('/',user_routes);
app.use('/',vendor_routes);
app.use('/',adminRoutes);


app.listen(port, () => {
    console.log("listening on port "+port)
});


