'use strict';


console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


exports.products = (event, context, callback) => {



    let products = [
        {
            "product_id": 01003440,
            "body_html": "<p>It's the small iPod with one very big idea: Video. Now the world's most popular music player, available in 4GB and 8GB models, lets you enjoy TV shows, movies, video podcasts, and more. The larger, brighter display means amazing picture quality. In six eye-catching colors, iPod nano is stunning all around. And with models starting at just $149, little speaks volumes.<\/p>",
            "handle": "ipod-nano",
            "product_type": "Nu Skin",
            "title": "IPod Nano - 8GB",
            "status": true,
            "price": "199.00",
            "formatted_price": "$199.00",
            "grams": 567,
            "requires_shipping": true,
            "sku": "IPOD2008PINK",
            "taxable": true,
            "available": true,
            "inventory_quantity": 1000,
            "inventory_management": "SAP",
            "weight": 1.25,
            "weight_unit": "lb",
        }
    ];
    callback(null, {
        statusCode: '200',
        body:  JSON.stringify(products),
    });
};







/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.product = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
            break;
        case 'POST':
            dynamo.putItem(JSON.parse(event.body), done);
            break;
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};