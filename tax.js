'use strict';

exports.tax = (event, context, callback) => {
    let tax = {
            "order_total_amount": 16.5,
            "shipping": 1.5,
            "taxable_amount": 15,
            "amount_to_collect": 1.35,
            "rate": 0.09,
            "has_nexus": true,
            "freight_taxable": false,
            "tax_source": "destination",
            "breakdown": {
                "taxable_amount": 15,
                "tax_collectable": 1.35,
                "combined_tax_rate": 0.09,
                "state_taxable_amount": 15,
                "state_tax_rate": 0.0625,
                "state_tax_collectable": 0.94,
                "county_taxable_amount": 15,
                "county_tax_rate": 0.0025,
                "county_tax_collectable": 0.04,
                "city_taxable_amount": 0,
                "city_tax_rate": 0,
                "city_tax_collectable": 0,
                "special_district_taxable_amount": 15,
                "special_tax_rate": 0.025,
                "special_district_tax_collectable": 0.38,
                "line_items": [
                    {
                        "id": "1",
                        "taxable_amount": 15,
                        "tax_collectable": 1.35,
                        "combined_tax_rate": 0.09,
                        "state_taxable_amount": 15,
                        "state_sales_tax_rate": 0.0625,
                        "state_amount": 0.94,
                        "county_taxable_amount": 15,
                        "county_tax_rate": 0.0025,
                        "county_amount": 0.04,
                        "city_taxable_amount": 0,
                        "city_tax_rate": 0,
                        "city_amount": 0,
                        "special_district_taxable_amount": 15,
                        "special_tax_rate": 0.025,
                        "special_district_amount": 0.38
                    }
                ]
            }
        }
    callback(null, {
        statusCode: '200',
        body:  JSON.stringify(tax),
    });
};