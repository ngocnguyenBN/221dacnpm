var Product = require('../Models/managerProduct.model')
var ImgProduct = require('../Models/imagePro.model')
var Memory = require('../Models/memory.model')
var Discount = require('../Models/discountCode.model')
exports.get_list = function(req, res){
	Product.get_all((function(data){
		res.send(data);
	}))
}
//body-parser
exports.add = function(req, res){
	var data =req.body;
	console.log(data)
	product = data.product;
	image = data.image;
	memory = data.memory;
	discountCode = data.discountCode;
	Product.create(data, function(response){
		image.map((image)=>{
			image.Id_Product = response.Id;
			ImgProduct.create(image);
		})
		memory.map((memory)=>{
			memory.Id_Product = response.Id;
			Memory.create(memory)
		})
		discountCode[0].Id_Discount!=""&&discountCode[0].Price!=""&&discountCode.map((discountCode)=>{
			discountCode.Id_Product = response.Id;
			Discount.create(discountCode)
		})
		res.send(response);
	});
}

exports.detail = function(req, res){
	var product;
	var image ;
	let memory;
	let discountCode ;
	Product.getById(req.query.id ,function(response){
			// res.send({result: response})
			product = response;
			ImgProduct.getById(req.query.id ,function(response){
			// res.send({result: response})
			image = response;
			Memory.getById(req.query.id ,function(response){
				// res.send({result: response})
				memory = response;
				Discount.getById(req.query.id ,function(response){
					// res.send({result: response})
					discountCode = response;
					let infor ={
						product : product,
						image : image,
						memory: memory,
						discountCode: discountCode
					};
					res.send(infor)
				});
			});
			});
			
		});
}

exports.remove = function(req, res){
	Product.remove(req.query.id, function(response){
		Discount.remove(req.query.id)
		ImgProduct.remove(req.query.id)
		Memory.remove(req.query.id)
		res.send(response);
	});
}

exports.update = function(req, res){
	var data =req.body;
	console.log(data)
	product = data.product;
	image = data.image;
	memory = data.memory;
	discountCode = data.discountCode[0];
	Product.update([product,product.Id], function(response){
		image.map((image)=>{
			ImgProduct.update([image,product.Id,image.Id])
		})
		memory.map((memory)=>{
			memory&&Memory.update([memory,product.Id,memory.Id])
		})
		if(discountCode.Id_Discount==""||discountCode.Price==""){
			Discount.remove(product.Id)
		}else{
			Discount.update([discountCode,product.Id,discountCode.Id_Discount])
		}
		res.send({result: response});
	});
}