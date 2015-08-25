
// --- Debug functions
var d = function(vari) { console.log(require('util').inspect(vari, {colors: true, depth: 7})); };
var dd = function(vari) { console.log(require('util').inspect(vari, {colors: true, depth: 7})); process.exit(); };
// ---


var level3mws = require('./lib/level3mws.js');

// -----

// Demo Credentials
var auth = {
    accessgroup: "12345",
    serviceid: "BXYL77777",
    host: "cdn.examplehostname.de",
    apikey: "123456789",
    apisecret: "xyZthisisahash-AB5789010"
};

// -----

// API call to get your accessgroup id
level3mws({
 pathname: "/key/v1.0",
 method: "GET",
    apikey: auth.apikey,
    apisecret: auth.apisecret
}, function(r) {

    console.log(r);

});



 // API call to get your service ids
level3mws({
    pathname: "/services/cdn/v1.0/"+ auth.accessgroup,
    method: "GET",
    apikey: auth.apikey,
    apisecret: auth.apisecret
}, function(r) {

    console.log(r);

});



// API call for cache invalidation
var invalidationpath = "/*";

level3mws({
    pathname: "/invalidations/v1.0/" + auth.accessgroup + "/" + auth.serviceid + "/" + auth.host,
    method: "POST",
    postdata: "<paths><path>" + invalidationpath + "</path></paths>",
    apikey: auth.apikey,
    apisecret: auth.apisecret
}, function(r) {

    console.log(r);

});