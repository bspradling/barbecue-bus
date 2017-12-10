'use strict'

const HttpStatus = require('http-status');

module.exports = {
    post: function(request, response) {
        return response.status(HttpStatus.OK).send("Perfect, we will get on that!");
    }
}
