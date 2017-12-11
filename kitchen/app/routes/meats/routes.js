'use strict'

const ApiErrors = require('../../models/errors/ApiErrors')
const HttpStatus = require('http-status');


module.exports = {
    create: function(request, response) {
        var meats = request.app.kitchen.meats;
        var meatType = request.params.meatType;

        if (meats[meatType].quantity <= 0) {
            console.log("not enough food");
            const errorEntity = new ApiErrors.ErrorEntity(HttpStatus.INTERNAL_SERVER_ERROR, `Sold out of ${meatType}!`);
            return response.status(errorEntity.statusCode).send(errorEntity.errorEntity);
        }
        console.log("decreasing");
        meats[meatType].quantity--;
        return response.status(HttpStatus.CREATED).send();
    },
    list: function(request, response) {
        return response.status(HttpStatus.OK).send(request.app.kitchen.meats);
    }
}
