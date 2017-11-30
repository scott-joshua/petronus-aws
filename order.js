'use strict';

const uuidv1 = require('uuid/v1');


const AWS = require("aws-sdk");
const DOC = require("dynamodb-doc");

AWS.config.update({region: "us-west-1"});

const docClient = new DOC.DynamoDB();
exports.handler = (event, context, callback) => {

    let params = {
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
            params.Key = {ID : event['queryStringParameters']['SKU']};
            docClient.getItem(params, done);
            break;
        case 'PUT':
            params.Item = event.body;
            params.Key = {ID: event.body.ID};
            docClient.updateItem(params, done);
            break;
        case 'POST':
            params.Item = event.body;
            params.Key = {ID: uuidv1()};
            docClient.putItem(params, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }




/*



    {
            "ID": uuidv1(),
            "SoldToMemberID": "MY4057191",
            "CountryCode": "MY",
            "Reason": "STANDARD",
            "OrderAction": "SIMULATE",
            "CommissionInPriorMonth": "false",
            "Item": [
                {
                    "SKU": "37003440",
                    "RequestedQuantity": "1",
                    "PayWithPoints": "false",
                    "OneTime": "true",
                    "Action": "ADD"
                }
            ],
            "Shipping": {
                "ShippingParty": [
                    {
                        "ShippingMemberID": "MY4057191",
                        "Type": "SHIP_TO",
                        "ShippingAddress": {
                            "Name": "JIM BOB",
                            "Address": {
                                "Street1": "123 There St",
                                "City": "KUALA LUMPUR",
                                "Region": "WP",
                                "PostalCode": "50250",
                                "CountryCode": "MY"
                            },
                            "Contact": [
                                {
                                    "Country": "MY",
                                    "Value": {
                                        "Type": "WORKPHONE",
                                        "value": "12-12345678"
                                    }
                                },
                                {
                                    "Country": "MY",
                                    "Value": {
                                        "Type": "MOBILEPHONE",
                                        "value": "123-1234567"
                                    }
                                }
                            ]
                        }
                    }
                ],
                "ShippingMethod": {
                    "Code": "PU",
                    "PickUpLocation": "MY03"
                }
            }
        }
    */

};
