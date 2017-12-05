'use strict';

const AWS = require("aws-sdk");
AWS.config.update({region: "us-west-2"});
const docClient = new AWS.DynamoDB.DocumentClient();
const fetch = require("node-fetch");


const EVENT_SOURCE_TO_TRACK = /sns.amazonaws.com/;
const EVENT_NAME_TO_TRACK   = /CreateTopic/;
const DEFAULT_SNS_REGION  = 'us-west-2';
const SNS_TOPIC_ARN       = 'arn:aws:sns:us-west-2:771887159131:InventoryTopic';


exports.loadSKU = function(sku, countryCode, callback) {
    let body = {"CountryCode":countryCode,"Region":"","Item":[{"SKU":sku,"RequestedQuantity":"1"}]};

    fetch('https://www.nuskin.com/shop-service/api/v1/inventory/atp', {
        method: 'POST',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' , 'client_id':'735b1eb810304bba966af0891ab54053', 'client_secret':'0deea37049e84157A406C0C01D29F300'},
    })
        .then((response) => {
            if (response.ok) {
                return response;
            }
            return Promise.reject(new Error(
                `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
        })
        .then(response => response.buffer())
        .then((buffer) => {

                const product = JSON.parse(buffer);
                docClient.put({
                    TableName: 'Inventory',
                    Item: {SKU: sku, CountryCode: countryCode, qty: product.ATPCheckResponse.Item[0].TotalAvailableQuantity, timestamp: Date.now()}
                },   function(err, data) {
                    if (err) {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Added item:", JSON.stringify(data, null, 2));
                        callback(err, data);
                    }
                });
            }
        )
};


exports.get = function(sku, countryCode, callback) {
    docClient.get({
        TableName: 'Inventory',
        Key: {SKU: sku, CountryCode: countryCode}
    },  function(err, data) {
        if(!data.Item){
            exports.loadSKU(sku, countryCode, function(err, data){
                if(!err){
                    exports.get(sku, countryCode, callback)
                }else{
                    callback(err, data); //error loading SKU from SAP
                }
            });
        }else{
            callback(err, data);
        }
    });
};



exports.allocate = (event, context, callback) => {

    let params = {
        TableName:"Inventory",
        Key: {
            SKU : event.sku,
            CountryCode: event.countryCode,
        },
        UpdateExpression: "set qty = qty - :counter",
        ConditionExpression: "qty > :counter",
        ExpressionAttributeValues:{
            ":counter":event.requestedQuantity
        },
        ReturnValues:"ALL_NEW"
    };

    docClient.update(params,function(err, data){
       console.log("Return from update", data);

        console.log("now:", Date.now() - data.Attributes.timestamp);


       if(Date.now() > data.Attributes.timestamp + 10000){
           console.log("Time to update inventory");
           let sns = new AWS.SNS();

           sns.publish({
               Message: JSON.stringify(data.Attributes),
               TopicArn: SNS_TOPIC_ARN
           }, function(err, data) {
               if (err) {
                   console.log("ERRIR" + err.stack);
                   return;
               }
               console.log('push sent');
               console.log(data);
               context.done(null, 'Function Finished!');
           });
       }

    });
};



