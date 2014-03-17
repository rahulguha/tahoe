/**
 * Created by rahulguha on 26/02/14.
 */
var util = require('../util/util.js');
var knox = require('knox');
var inspect = require('util').inspect;
Busboy = require('busboy');

//var generate_signed_url = function(filename){

    var s3Client = knox.createClient({
        key: util.get_aws().AWS_KEY,
        secret: util.get_aws().AWS_SECRET,
        bucket: 'rahul.s3.upload'
    });
    var expires = new Date();

var generate_signed_url = function(filename){
    expires.setMinutes(expires.getMinutes() + 30);
    return s3Client.signedUrl(filename, expires);
}
var upload_file = function(){
    var filename;
    var filesize;
    var filetype;
}
exports.upload = function(req, res) {
    var busboy = new Busboy({ headers: req.headers });
    var f = new upload_file();
    req.files = {};
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding);
        f.filename = filename;
        f.filetype = mimetype;
        file.fileRead = [];
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            // Push chunks into the fileRead array
            this.fileRead.push(data);
            f.filesize= f.filesize + data.length;
//            s3Client.putStream(data, f.filename, {
//                'Content-Length': data.length,
//                'Content-Type': f.filetype,
//                'x-amz-acl': 'public'
//            }, function (err, res) {
//                if (err) console.log(err);
//
//                res.resume();
//            });
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
            var finalBuffer = Buffer.concat(this.fileRead);

            req.files[fieldname] = {
                buffer: finalBuffer,
                size: finalBuffer.length,
                filename: filename,
                mimetype: mimetype
            };
            console.log(req.files);
            var headers = {
                'Content-Length': req.files[fieldname].size,
                'Content-Type': req.files[fieldname].mimetype,
                'x-amz-acl': 'public-read'
            };

            s3Client.putBuffer( req.files[fieldname].buffer, "/", headers, function(err, response){

                if (response.statusCode !== 200) {
                    console.error('error streaming image: ', new Date(), err);
                    return next(err);
                }
                console.log('Amazon response statusCode: ', response.statusCode);
                console.log('Your file was uploaded');
                next();
            });
        });


    });
    busboy.on('field', function(fieldname, val, valTruncated, keyTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
        console.log(generate_signed_url(inspect(val)));
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        console.log(f.filesize);
//        s3Client.putFile(f.filename, f.filename, function(err, res){
//            if (err) throw err;
//            // Always either do something with `res` or at least call `res.resume()`.
//            res.resume();
//        });
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
    });
    req.pipe(busboy);
    //res.send("upload complete");

};