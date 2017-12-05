'use strict';

const nsinventory = require("lib/nuskin-inventory");


exports.handler = (event, context, callback) => {

    let sku = event['pathParameters']['SKU'];
    let countryCode = event['pathParameters']['CountryCode'];

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    nsinventory.get(sku, countryCode, done);
};


exports.create = function (event, context, callback) {
    let sku = event.sku;
    let countryCode = event.countryCode;
    nsinventory.loadSKU(sku, countryCode, done);

    /*
    USE TO CLEAR CACHE IF USING GATEWAY CACHE
    var params = {
        restApiId: 'atpCheck',
        stageName: 'stage'
    };
    apigateway.flushStageAuthorizersCache(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
    */

};


exports.updateSKU = function(event, context, callback) {
    let message = event.Records[0].Sns.Message;
    console.log('Message received from SNS:', message);
    nsinventory.loadSKU(message.sku, message.countryCode, callback);
};



exports.allocate = function(event, context, callback) {
    nsinventory.allocate(event, context, callback);
};



