/**
 * Created with JetBrains WebStorm.
 * User: Rahul
 * Date: 21/2/14
 * Time: 9:06 PM
 * To change this template use File | Settings | File Templates.
 */
//var cat = require('../schema/category.js');
var api = require('../controllers/api.js');
var aws = require('../controllers/aws.js');

exports.send_email = function(req, res) {
    console.log("routes.send_email");
    api.email();
    res.send("Email Sent");
};
exports.findAll = function(req, res) {
    console.log("routes.findAll");
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};

exports.findById = function(req, res) {
    console.log("routes.findbyId");
    res.send({id:req.params.id, name: "The Name", description: "description"});
};

exports.cat = function(req, res) {
    api.cat_list(req,res);
};

exports.claim = function (req, res) {
    api.claim_list(req, res);
};
exports.claim_by_company = function (req, res) {
    api.claims_by_company(req, res);
};

exports.get_email_requests = function (req, res) {
    api.get_email_requests(req, res);
    //console.log("grrr");
};

// Add new methods for exporting apis *************************************************************************
exports.login = function(req, res) {
   // api.cat_list(req,res);
//    console.log (req.body);
    api.user_login(req,res);
};


exports.addclaim = function (req, res) {
    // api.cat_list(req,res);
    //    console.log (req.body);
    api.add_claim(req, res);
};

// ******************************************************************************************

exports.upload = function(req, res) {

    console.log(req.body);
    //console.log(aws.generate_signed_url(req.body.filename));
    aws.upload(req, res);
    //res.send({id:req.params.id, name: "The Name", description: "description"});
};