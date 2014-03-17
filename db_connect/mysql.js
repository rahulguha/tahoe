/**
 * Created by rahulguha on 05/03/14.
 */
var mysql = require('mysql2'),
    util = require('../util/util.js');

var logger = util.get_logger("db_connect");
exports.get_mysql_connection = function() {
    var mysql_db  = util.get_connection_string("mysql");
    var mysql_connection = mysql.createConnection({
        host     : mysql_db.ip,//"54.209.85.21" ,
        user     : util.get_db_user("mysql"), //"annectos",
        password : util.get_db_pwd("mysql"),//"annectos123",
        database : util.get_db("mysql"), //"ecomm",
        port     : 3306
    });
    mysql_connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            logger.info('error when connecting to db:');
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    mysql_connection.on('error', function(err) {
        logger.info('db error when connecting to db:');
        logger.info(err);

        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            logger.info('db error when connecting to db:');
            logger.info(err);
            handleDisconnect();
        }
        return null;
    });
    logger.info("connected to mysql hosted at - " + mysql_db.ip )
    return mysql_connection;
};
var handleDisconnect = function(){
    // todo implement cleanup code
}