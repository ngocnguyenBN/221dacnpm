var Cart = require('../Controllers/customer.controller')
module.exports = function(router){
	router.post('/cart/add', Cart.add);
	router.get('/cart/list', Cart.get_list);
	router.delete('/cart/delete', Cart.remove);
	router.put('/cart/update', Cart.update);
	router.get('/cart/detail', Cart.detail);
};