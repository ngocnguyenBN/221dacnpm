module.exports = function(router){
	var Product = require('../Controllers/managerProduct.controller')
	router.post('/product/add', Product.add);
	router.get('/product/list', Product.get_list);
	router.delete('/product/delete', Product.remove);
	router.put('/product/update', Product.update);
	router.get('/product/detail', Product.detail);
};