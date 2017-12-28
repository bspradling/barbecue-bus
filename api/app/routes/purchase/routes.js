'use strict'

const ApiErrors = require('../../models/errors/ApiErrors');
const Async = require('async');
const Axios = require('axios');
const Config = require('config');
const HttpStatus = require('http-status');

const meats = [ "BRISKET", "SAUSAGE", "RIBS", "CHICKEN" ];
const sides = [ "BEANS", "MACARONI"]

function makeRequestToKitchen(foodType, foodName, quantity, callback) {
    Async.times(quantity, function(n, next) {
        Axios.post(`${Config.get("kitchen.scheme")}://${Config.get("kitchen.host")}/api/v1/${foodType}/${foodName}`)
        .then(function(purchaseResponse) {
            console.log(`Sending Kitchen Response: ${purchaseResponse}`);
            return setImmediate(next)
        })
        .catch(function(error) {
            return setImmediate(next, error);
        });
    },
    function(err, result) {
        if (err) {
            return setImmediate(callback, err);
        }
        return setImmediate(callback);
    });
}

module.exports = {
    create: function(request, response) {
        const requestBody = request.body;
        console.log(`Order Received: ${JSON.stringify(requestBody)}`);
        
        Async.map(requestBody.food, (foodOrder, callback) => {
            if (meats.includes(foodOrder.item.toUpperCase())) {
                console.log(`Sending ${foodOrder.quantity} meat request(s) for: ${foodOrder.item}`)
                return makeRequestToKitchen("meats", foodOrder.item.toUpperCase(), foodOrder.quantity, callback)
            }
            if (sides.includes(foodOrder.item.toUpperCase())) {
                console.log(`Sending ${foodOrder.quantity} side request(s) for: ${foodOrder.item}`)
                return makeRequestToKitchen("sides", foodOrder.item.toUpperCase(), foodOrder.quantity, callback)
            }
        },
        function(err, results) {
            if (err) {
                console.log("ERRORIN!");
                console.log(err.response)
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("sorry");
            }
            return response.status(HttpStatus.CREATED).send("Enjoy!");
        });
    }
}
