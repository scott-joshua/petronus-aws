'use strict';

const uuidv1 = require('uuid/v1');


var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");

AWS.config.update({region: "us-west-2"});

var docClient = new DOC.DynamoDB();


exports.handler = (event, context, callback) => {


    //console.log("Event..." + JSON.stringify(event));


    var params = {
        TableName: 'Orders'
    };

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });


    switch (event.httpMethod) {


        case 'GET':
            params.Key = {OrderId: event['pathParameters']['ID']};
            docClient.getItem(params, done);
            break;
        case 'PUT':
            params.Item = event.body;
            params.Key = {OrderId: event.body.OrderId};
            docClient.updateItem(params, done);
            break;
        case 'POST':
            var order = JSON.parse(event.body);
            order.OrderId = uuidv1();
            params.Item = order;
            docClient.putItem(params, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
}