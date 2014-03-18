/**
 * Created with JetBrains WebStorm.
 * User: Rahul
 * Date: 22/2/14
 * Time: 6:16 AM
 * To change this template use File | Settings | File Templates.
 */
/* The API controller
 Exports 3 methods:
 * post - Creates a new thread
 * list - Returns a list of threads
 * show - Displays a thread and its posts
 */
var jade = require('jade'),
    fs = require('fs');
var mysql = require("../db_connect/mysql.js");
var util = require('../util/util.js');
var email = require('../email/m.js');
var payload = require('../model/mail_payload.js');
var cat = require('../model/category.js');

var logger = util.get_logger("api");

//exports.post = function(req, res) {
//    new Thread({title: req.body.title, author: req.body.author}).save();
//}

    exports.cat_list = function(req, res) {
    cat
        .find()
        .select ('id name description -_id')
        .exec (function(err, cats){
            logger.info("category list returned");
            res.send(cats);
        });
}; //mongo db get method example

    exports.user_login = function(req, res) {
    var conn = mysql.get_mysql_connection();
    var sql = "call user_login ('" + req.body.email_id + "','" + req.body.password + "','" + req.body.login_date
                + "','"+ util.new_uuid() + "',0, 'wipro', '');"
    //conn.query("select * from user_registration where email_id='rahul.guha@gmail.com'",
    conn.query(sql,
        function (err, rows){
            if (err){
                logger.info(err)
                res.end;
            }
            logger.info("user login validated from mysql");
            res.send (rows);
        });


}; //mysql post method example

    exports.email = function() {
    fs.readFile('./email_template/greetings.jade', 'utf8', function (err, data) {
        if (err) {
                logger.info(err)
                throw err;
            };

        var options ={};
        options.filename =  util.get_email_templating_engine("jade").config.template_path ;
        var fn = jade.compile(data, options);
        var html = fn({name:'Tabbu'});
        payload.Mail_payload("rahul@annectos.in, rahul.guha@gmail.com", "", "This is a good subject", html);
        var msg = email.set_message(payload);

        email.send_email(msg);
        logger.info("email sent successfully. ")
        logger.info(html)
    });

    //res.send("email sent");
} // email handling - todo - to be refactored a little



// first locates a thread by title, then locates the replies by thread ID.
//exports.cat_by_id = (function(req, res) {
//    cat.findOne({id: req.params.id}, cats) {
//            res.send([{thread: thread, posts: posts}]);
//});
//}
//// first locates a thread by title, then locates the replies by thread ID.
//exports.show = (function(req, res) {
//    Thread.findOne({title: req.params.title}, function(error, thread) {
//        var posts = Post.find({thread: thread._id}, function(error, posts) {
//            res.send([{thread: thread, posts: posts}]);
//        });
//    })
//});