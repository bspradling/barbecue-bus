'use strict'

const _ = require('lodash');
const Async = require('async');
const Axios = require('axios');
const Config = require('config');
const HttpStatus = require('http-status');

module.exports = {
    get: function(request, response) {
        Axios.all([
            Axios.get(`${Config.get("kitchen.scheme")}://${Config.get("kitchen.host")}/api/v1/meats`),
            Axios.get(`${Config.get("kitchen.scheme")}://${Config.get("kitchen.host")}/api/v1/sides`)
        ]).then(Axios.spread(function(meatResponse, sideResponse) {
            console.log("Collecting Results from the Kitchen");
            console.log(meatResponse);
            const menu = _.merge(meatResponse.data, sideResponse.data);
            return response.status(HttpStatus.OK).send(menu);
        }))
        .catch(function(error) {
            console.log(error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("An unknown exception occurred while getting the menu")
        });
    }
}
