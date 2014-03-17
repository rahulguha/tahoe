/**
 * Created with JetBrains WebStorm.
 * User: Rahul
 * Date: 22/2/14
 * Time: 6:13 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var mongo = require('../db_connect/mongoose.js');

var catSchema = new Schema({
    id:  String,
    name:  String,
    displayname:  String,
    description: String
});
catSchema.set('collection', 'category')
//module.exports = mongoose.model('category', catSchema);
module.exports =  mongo.get_mongoose_connection().model('category', catSchema);