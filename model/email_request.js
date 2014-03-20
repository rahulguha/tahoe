/**
 * Created by rahulguha on 18/03/14.
 */


var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectID;

var mongo = require('../db_connect/mongoose.js');

var call_detailSchema= new Schema({
    event_id : { type: Number},
    data_id : { type: String, trim: true }
});

var addressSchema = new Schema({
    name : { type: String, trim: true },
    email :  { type: String, trim: true },
    _id : false
});

var email_requestSchema = new Schema(
//    { _id: false },
    {

    app_id : { type: String, trim: true },
    priority:  { type: Number},
    send_status:  { type: Number},
    call_details : {
        event_id : { type: Number},
        data_id : { type: String, trim: true },
        id : false
                },
    from :  { type: String,  trim: true },
    to : [addressSchema],
    cc : [addressSchema],
    bcc : [addressSchema],
    template_id : { type: String, trim: true },
//    data:  {  any: {}  } // todo - fix it later
    data : { type: String, trim: true }
});

// static methods
email_requestSchema.statics.get_request = function(){
    //var claims = [];
    return this.find({send_status : 0}).sort({$natural:1}).exec();// Should return a Promise
}

email_requestSchema.set('collection', 'req_q');

module.exports = mongo.get_mongoose_connection().model('email_request', email_requestSchema);