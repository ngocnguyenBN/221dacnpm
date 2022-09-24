module.exports = function(router){
	var cart = require('../Controllers/cart.controller')
	router.post('/cart/add', cart.add);
};