'use strict'

const ApiErrors = require('../../models/errors/ApiErrors')
const HttpStatus = require('http-status');
const RandomNumber = require('random-number');

module.exports = {
    create: function(request, response) {
        var meats = request.app.kitchen.meats;
        var meatType = request.params.meatType.toUpperCase();

        if (meats[meatType].quantity <= 0) {
            console.log("not enough food");
            const errorEntity = new ApiErrors.ErrorEntity(HttpStatus.INTERNAL_SERVER_ERROR, "SOLD_OUT", `Sorry, we are sold out of ${meatType}!`);
            return response.status(errorEntity.statusCode).send(errorEntity.errorEntity);
        }

        console.log("decreasing meat");
        meats[meatType].quantity--;

        if (meatType == "CHICKEN") {
            var options = {
                min: 0,
                max: 9,
                integer: true
            }

            if (RandomNumber(options) < 3) {
                const errorEntity = new ApiErrors.ErrorEntity(HttpStatus.INTERNAL_SERVER_ERROR, "BURNT", `Sorry, we burnt the ${meatType}!`);
                return response.status(errorEntity.statusCode).send(errorEntity.errorEntity); 
            }
        }

        return response.status(HttpStatus.CREATED).send();
    },
    list: function(request, response) {
        return response.status(HttpStatus.OK).send(request.app.kitchen.meats);
    }
}
