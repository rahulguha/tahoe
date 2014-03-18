/**

 * User: Hassan
 * Date: 10/03/14
 * Time: 4:07 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectID;

var mongo = require('../db_connect/mongoose.js');

var claim_detail= new Schema({
    invoice_number: { type: String, trim: true },
    invoice_amount: { type: String, trim: true },
    acq: { type: String, trim: true },
    sku: { type: String, trim: true },
    fld1: { type: String, trim: true },
    fld2: { type: String, trim: true }
});

var doc_list = new Schema({
    name: { type: String, trim: true },
    img_url: { type: String, trim: true } 
});

var wrk_flw = new Schema({
    step_id: { type: String, trim: true },
    step_name: { type: String, trim: true },
    next_step_id: { type: String, trim: true },
    next_step_name: { type: String, trim: true },
    step_status: { type: String, trim: true }
   
});

var claimSchema = new Schema({
    claim_id: { type: String, trim: true },
    user_id:  { type: String,  trim: true },
    company:  { type: String,  trim: true },
    active: { type: String, trim: true },
    claim_details:  [claim_detail] ,
    supporting_doc_list: [doc_list],
    workflow: [wrk_flw]
});

// static methods
claimSchema.statics.find_claims_by_company = function(company){
    //var claims = [];
    return this.find({company : company}).exec();// Should return a Promise
}


claimSchema.set('collection', 'claims')
//module.exports = mongoose.model('category', catSchema);

module.exports = mongo.get_mongoose_connection().model('claims', claimSchema);