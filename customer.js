'use strict';

exports.customer = (event, context, callback) => {
    let customer = {
        "id": "US00320640",
        "sponsorId": "US8128558",
        "referrerId": null,
        "country": "US",
        "currency": "USD",
        "preferredLanguage": "SPA",
        "customerType": "DIST",
        "temporary": false,
        "deleted": false,
        "disabled": false,
        "priceType": "WHL",
        "preferredName": "MY BUSINESS IN THE USA"
    }
    callback(null, {
        statusCode: '200',
        body:  JSON.stringify(customer),
    });
};