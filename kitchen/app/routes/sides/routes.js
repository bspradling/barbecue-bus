'use strict'

const HttpStatus = require('http-status');

module.exports = {
    create: function(request, response) {
        var sides = request.app.kitchen.sides;
        var sideType = request.params.sideType;

        if (sides[sideType].quantity <= 0) {
            const errorEntity = new ApiErrors.ErrorEntity(HttpStatus.INTERNAL_SERVER_ERROR, `Sold out of ${sideType}!`);
            return setImmediate(callback, errorEntity)
        }
        console.log("decreasing side");
        sides[sideType].quantity--;
        return response.status(HttpStatus.CREATED).send();
    },
    list: function(request, response) {
        return response.status(HttpStatus.OK).send(request.app.kitchen.sides);
    }
}
