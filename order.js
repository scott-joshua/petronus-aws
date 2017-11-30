'use strict';

const uuidv1 = require('uuid/v1');

const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.order = (event, context, callback) => {

    let order = event.body;
    order.ID = uuidv1();


    let params = {
        Item: order,
        TableName: 'Orders'
    };

    console.log("Adding a new Order..." + order.ID);
    docClient.put(params, done(err, data));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });
/*
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
