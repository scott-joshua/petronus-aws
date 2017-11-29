'use strict';

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