var Customer = require('../Models/customer.model')
exports.get_list = function (req, res) {
	Customer.get_all((function (data) {
		res.send(data);
	}))
}
//body-parser
exports.add = function (req, res) {
	var data = req.body;
	console.log(data)
	product = data.product;
	image = data.image;
	memory = data.memory;
	discountCode = data.discountCode;
	Customer.create(data, function (response) {
		customer.map((customer) => {
			customer.Id_Cart = response.Id;
		})
		res.send({ result: response });
	});
}

exports.detail = function (req, res) {
	var customer;
	Customer.getById(req.query.id, function (response) {
		customer = response;
		// let infor = {
		// 	customer: customer,
		// };
		res.send(customer)	
		});
}

exports.remove = function (req, res) {
	Customer.remove(req.query.id, function (response) {
		Discount.remove(req.query.id)
		ImgProduct.remove(req.query.id)
		Memory.remove(req.query.id)
		res.send(response);
	});
}

exports.update = function (req, res) {
	var data = req.body;
	var data = req.body;
	product = data.product;
	image = data.image;
	memory = data.memory;
	discountCode = data.discountCode;
	Customer.update([product, product.Id], function (response) {
		image.map((image) => {
			ImgProduct.update([image, product.Id, image.Id])
		})
		memory.map((memory) => {
			Memory.update([memory, product.Id, memory.Id])
		})
		discountCode.map((discountCode) => {
			Discount.update([discountCode, product.Id, discountCode.Id_Discount])
		})
		res.send({ result: response });
	});
}