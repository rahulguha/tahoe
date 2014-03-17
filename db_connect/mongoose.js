/**
 * Created by rahulguha on 05/03/14.
 */
var mongoose = require('mongoose'),
    util = require('../util/util.js');

var logger = util.get_logger("mongoose");
exports.get_mongoose_connection = function(req, res, mongo_connection) {
    mongo_connection  = mongoose.createConnection(util.get_connection_string("mongo"));
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    logger.info("mongodb connection established");
    return mongo_connection;
};
