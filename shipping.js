'use strict';

exports.shipping = (event, context, callback) => {
    let shippingOptions = [
        {
            "code": "Free Shipping",
            "price": 0.0,
            "source": "Nu Skin",
            "title": "Free Shipping",
            "tax_lines": [
                {
                    "title": "State Tax",
                    "price": "3.98",
                    "rate": 0.06
                }
            ],
            "carrier_identifier": "third_party_carrier_identifier",
            "requested_fulfillment_service_id": "third_party_fulfillment_service_id"
        },
        {
            "code": "STD",
            "price": 5.00,
            "source": "Nu Skin",
            "title": "Standard Shipping",
            "tax_lines": [
                {
                    "title": "State Tax",
                    "price": "0.30",
                    "rate": 0.06
                }
            ],
            "carrier_identifier": "third_party_carrier_identifier",
            "requested_fulfillment_service_id": "third_party_fulfillment_service_id"
        }
    ]
    callback(null, {
        statusCode: '200',
        body:  JSON.stringify(shippingOptions),
    });
};
