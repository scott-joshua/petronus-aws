'use strict';

const uuidv1 = require('uuid/v1');

const AWS = require("aws-sdk");
AWS.config.update({region: "us-west-1"});

var docClient = new AWS.DynamoDB.DocumentClient();

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

    console.log("HTTP Method...." + event.httpMethod);

    switch (event.httpMethod) {



        case 'GET':
            params.Key = {ID : event['queryStringParameters']['SKU']};
            docClient.get(params, done);
            break;
        case 'PUT':
            params.Item = event.body;
            params.Key = {ID: event.body.ID};
            docClient.update(params, done);
            break;
        case 'POST':
            params.Item = event.body;
            console.log("Creating Order...." + JSON.stringify(params));
            //params.Item.orderid = uuidv1();
            docClient.put(params,function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    done(err, data);
                } else {
                    console.log(data);
                    done(err, data);
                }
            });
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
