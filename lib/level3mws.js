// -----------------------------------
var https = require('https');
var crypto = require('crypto');
// -----------------------------------

// Debug Helpers
var d = function(vari) { console.log(require('util').inspect(vari, {colors: true, depth: 7})); };
var dd = function(vari) { console.log(require('util').inspect(vari, {colors: true, depth: 7})); process.exit(); };


// -----------------------------------
// Level 3 Media Web Services
// https://mediaportal.level3.com/webhelp/help/Content/API/APIGetStarted.htm
// -----------------------------------

// apiCall
exports = module.exports = function(options, callback) {

    // Date
    var reqdate = new Date().toUTCString();
    //var reqdate = require('dateformat')(new Date(), "ddd, d mmm yyyy HH:MM:ss", true) + " +0000";


    // Get Signature
    var sigdata = reqdate + "\n" + options.pathname + "\n" + "text/xml" + "\n" + options.method + "\n" + "" ;
    var hmac = crypto.createHmac('sha1', options.apisecret);
    hmac.update(sigdata);
    var signature = "MPA " + options.apikey + ":" + hmac.digest('base64');


    // Do API-Request
    var apirequest = https.request({
        host: "ws.level3.com",
        port: 443,
        path: options.pathname,
        method: options.method,
        headers: {
            'Content-Type': "text/xml",
            'Authorization': signature,
            'Date': reqdate
        }

    }, function(res) {

        //console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);

        res.setEncoding('utf8');
        res.on('data', function (response) {

            //console.log("body: ", response);
            callback(response);

        });
    });

    if(options.postdata) {
        apirequest.write(options.postdata);
    }
    apirequest.end();

}
