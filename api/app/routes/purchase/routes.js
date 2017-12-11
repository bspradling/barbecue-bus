'use strict'

const ApiErrors = require('../../models/errors/ApiErrors');
const Axios = require('axios');
const Config = require('config');
const HttpStatus = require('http-status');

module.exports = {
    create: function(request, response) {
        console.log("creating");

        Axios.post(`${Config.get("kitchen.scheme")}://${Config.get("kitchen.host")}/api/v1/meats/BRISKET`)
             .then(function(purchaseResponse) {
                console.log(purchaseResponse);
                return response.status(HttpStatus.OK).send(purchaseResponse.body);
             })
             .catch(function(error) {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("An unknown exception occurred while fullfilling order")
             });
    }
}
