'use strict'

const HttpStatus = require('http-status');

module.exports = {
    create: function(request, response) {
        return response.status(HttpStatus.OK).send(`Cooking ${request.params.meatType}!`);
    },
    list: function(request, response) {
        return response.status(HttpStatus.OK).send(request.app.kitchen.meats);
    }
}
