/**
 * Created with JetBrains WebStorm.
 * User: Rahul
 * Date: 21/2/14
 * Time: 9:02 PM
 * To change this template use File | Settings | File Templates.
 */
var express = require('express'),
    routes = require('./routes/routes.js'),
    config =require('./config/config.json'),
    util = require('./util/util.js'),
    _ = require('lodash-node')
    ;

var logger = util.get_logger("server");


var app = express();
app.use(express.json()); // for json body
app.use(express.urlencoded()); // for url encoded body
app.use(app.router);
logger.info("express loaded");


app.post('/upload', routes.upload);
app.get('/routes', routes.findAll);
app.get('/routes/:id', routes.findById);
app.get('/store/cat', routes.cat);




//todo add new routes for project chandler here *********************************************
// add corresponding method in routes.js
app.post('/user/login', routes.login);
app.post('/claim/add', routes.addclaim);

//******************************************************************************************
app.get('/email', routes.send_email);
app.get('/file/', routes.send_email);
logger.info("routes are loaded");

app.listen(3000);
logger.info("http server started");
console.log('Listening on port 3000...');