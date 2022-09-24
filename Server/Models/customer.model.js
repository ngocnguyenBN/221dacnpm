const db = require('../Config/ConnectMySql')

const Customer = function (customer) {
	this.Id_Cart = customer.Id_Cart
	this.Name_Client = customer.Name_Client
	this.Address_Client = customer.Address_Client
	this.Phone_Client = customer.Phone_Client
	this.Email_Client = customer.Email_Client
	this.Pay_Method = customer.Pay_Method
	this.Buy_Time = customer.Buy_Time
}

Customer.get_all = function (result) {
	db.query("SELECT * FROM cart", function (err, book) {
		if (err) {
			result(null);
		}
		else result(book);
		console.log(book);
	});
}

// Customer.getById = function(id, result){
// 	db.query("SELECT * FROM cart WHERE id= ?",id, function(err,book){
// 		if(err || book.length==0) {
// 			result(null);
// 		}
// 		else result(book[0]);
// 	});
// }

Customer.getById = function (id, result) {
	db.query("SELECT cart.Id_Cart AS Id_Cart, cart.Buy_Time AS Buy_Time, memory.Price AS Price FROM cart JOIN belongtocart JOIN memory ON cart.Id_Cart = belongtocart.Id_Cart and belongtocart.Id_Product = memory.Id_Product",
		function (err, book) {
			if (err || book.length == 0) {
				result(null);
			}
			else result(book);
		});
}

Customer.create = function (data, result) {
	db.query('INSERT INTO cart SET ?', data.product, function (err, book) {
		if (err) {
			result(err);
		}
		else {
			result({ Id: book.insertId, ...data.product });
		}
	})
}

Customer.remove = function (id, result) {
	db.query('DELETE FROM cart WHERE Id=?', id, function (err, book) {
		if (err) {
			result(null);
			console.log(err)
		}
		else {
			console.log("Delete successfully")
			result(null);
		}
	})
}
Customer.update = function ([data, Id], result) {
	const test = db.query('UPDATE cart  SET ? WHERE Id=?', [data, Id], function (err, book) {
		if (err) {
			result(null);
			console.log(err)
		}
		else {
			result({ ...data });
		}
	})

}
module.exports = Customer;