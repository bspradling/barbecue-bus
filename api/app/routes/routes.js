var Express = require('express');
var Menu = require('./menu/get');
var Purchase = require('./purchase/post');

var router = Express.Router();

router.route('/menu').get(Menu.get);
router.route('/purchase').post(Purchase.post);

module.exports = router;
