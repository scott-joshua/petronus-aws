'use strict';

const uuidv1 = require('uuid/v1');


var AWS = require("aws-sdk");

AWS.config.update({region: "us-west-2"});

var docClient = new AWS.DynamoDB.DocumentClient();





let getCart = function(cartId, calllback ){
    docClient.get({TableName: 'Carts', Key: {CartId: cartId}},callback);
};


exports.handler = (event, context, callback) => {


    //console.log("Event..." + JSON.stringify(event));


    var params = {
        TableName: 'Carts'
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
            params.Key = {CartId: event['pathParameters']['ID']};
            docClient.get(params, done);
            break;
        case 'PUT':
            params.Item = event.body;
            params.Key = {CartId: event.body.CartId};
            docClient.update(params, done);
            break;
        case 'POST':
            var cart = JSON.parse(event.body);
            cart.CartId = uuidv1();
            params.Item = cart;
            docClient.put(params, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
}


exports.item = (event, context, callback) => {


    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });


    switch (event.httpMethod) {
        case 'Delete':
            params.Key = {CartId: event['pathParameters']['ID']};
            docClient.getItem(params, done);
            break;
        case 'PUT':
            params.Item = event.body;
            params.Key = {CartId: event.body.CartId};
            docClient.updateItem(params, done);
            break;
        case 'POST':
            getCart(event.cartId, function(err, cart){
              if(cart.items[event.sku]){
                  cart.items[event.sku].qty = cart.items[event.sku].qty + event.requestedQuantity;
              }else{
                  cart.items[event.sku] = {qty: event.requestedQuantity    }
              }
            })

            var params = {
                TableName:"Carts",
                Key:{
                    "CartId": event.body.CartId
                },
                UpdateExpression: "set item[:sku].qty =  item[:sku].qty + :val",
                ConditionExpression: "attribute_exists(item[:sku]) AND size(info.actors) > :num",
                ExpressionAttributeValues:{
                    ":sku":sku,
                    ":val":qty
                },
                ReturnValues:"UPDATED_NEW"
            };

            console.log("Attempting a conditional update...");
            docClient.update(params, function(err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                }
            });
            docClient.putItem(params, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
}