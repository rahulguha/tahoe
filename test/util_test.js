/**
 * Created by rahulguha on 23/02/14.
 */
var util = require('../util/util.js');
var events = require('events')
exports['get connection string'] = function (test) {
    test.equal(util.get_connection_string(), "mongodb://54.209.192.243/annectos_prod?poolSize=4");
//    test.throws(function () { util.get_connection_string(); });
//    test.throws(function () { util.get_connection_string(null); });
//    test.throws(function () { util.get_connection_string(true); });
//    test.throws(function () { util.get_connection_string([]); });
//    test.throws(function () { util.get_connection_string({}); });
//    test.throws(function () { util.get_connection_string('asdf'); });
//    test.throws(function () { util.get_connection_string('123'); });
    test.done();
};