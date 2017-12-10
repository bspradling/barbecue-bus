'use strict'

const _ = require('lodash');
const Async = require('async');
const Config = require('config');
const Request = require('request');
const HttpStatus = require('http-status');

module.exports = {
    get: function(request, response) {
        Async.parallel({
            meats: function(callback) {
                Request(`${Config.get("kitchen.scheme")}://${Config.get("kitchen.host")}/api/v1/meats`, function(error, res, body) {
                    if (error) {
                        return callback(error);
                    }
                    console.log(`Received Response From Kitchen: ${body}`);
                    return callback(null, body);
                });
            },
            sides: function(callback) {
                Request(`${Config.get("kitchen.scheme")}://${Config.get("kitchen.host")}/api/v1/sides`, function(error, res, body) {
                    if (error) {
                        return callback(error);
                    }
                    console.log(`Received Response From Kitchen: ${body}`);
                    return callback(null, body);
                });
            }
        }, function(error, parallelResponse) {
            console.log("Collecting Results from the Kitchen");
            const menu = _.merge(JSON.parse(parallelResponse.meats), JSON.parse(parallelResponse.sides));
            response.status(HttpStatus.OK).send(menu);
        })        
    }
}
