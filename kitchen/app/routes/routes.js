var Express = require('express');
var Meats = require('./meats/routes');
var Sides = require('./sides/routes')

var router = Express.Router();

router.route('/meats').get(Meats.list);
router.route('/sides').get(Sides.list);
router.route('/meats/:meatType').post(Meats.create);
router.route('/sides/:sideType').post(Sides.create);

module.exports = router;
