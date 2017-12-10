'use strict'

const HttpStatus = require('http-status');

module.exports = {
    get: function(request, response) {
        return response.status(HttpStatus.OK).send("Isn't the menu great?");
    }
}
