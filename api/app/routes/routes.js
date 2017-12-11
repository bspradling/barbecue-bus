var Express = require('express');
var Menu = require('./menu/routes');
var Purchase = require('./purchase/routes');

var router = Express.Router();

router.route('/menu').get(Menu.get);
router.route('/purchase').post(Purchase.create);

module.exports = router;
