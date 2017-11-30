'use strict';


const AWS = require("aws-sdk");
const DOC = require("dynamodb-doc");

AWS.config.update({region: "us-west-1"});

const docClient = new DOC.DynamoDB();

exports.handler = (event, context, callback) => {

    let params = {};
    params.TableName = "Products";
    params.Item = JSON.parse(event.body);

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });


    switch (event.httpMethod) {

        case 'GET':
            params.Key = {SKU : event['pathParameters']['SKU']};
            docClient.getItem({ TableName: "Products" }, done);
            break;
        case 'POST':
            docClient.putItem(params, done);
            break;
        case 'PUT':
            docClient.updateItem(params, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }

};



