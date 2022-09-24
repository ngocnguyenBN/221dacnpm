const db = require('../Config/ConnectMySql')

const Product = function (procduct) {
    this.Id = procduct.Id
    this.Product_Type = procduct.Product_Type
    this.Product_Name = procduct.Product_Name
    this.Color = procduct.Color
    this.Discount = procduct.Discount
    this.battery = procduct.battery
    this.Os = procduct.Os
    this.DisplaySize = procduct.DisplaySize
    this.chip = procduct.chip
    this.InStock = procduct.InStock
}

Product.get_all = function(result){
	db.query("SELECT * FROM Product", function(err,book){
		if(err) {
			result(null);
		}
		else result(book);
	});
}

Product.getById = function(id, result){
	db.query("SELECT * FROM Product WHERE id= ?",id, function(err,book){
		if(err || book.length==0) {
			result(null);
		}
		else result(book[0]);
	});
}
Product.create = function(data, result){
	db.query('INSERT INTO Product SET ?', data.product, function(err,book){
		if(err){
			result(err);
		}
		else{
			result({Id:book.insertId, ...data.product});
		}
	})
}

Product.remove = function(id, result){
	db.query('DELETE FROM Product WHERE Id=?', id, function(err,book){
		if(err){
			result(null);
			console.log(err)
		}
		else{
			console.log("delete successfully")
			result(null);
		}
	})
}
Product.update = function([data,Id], result){
	const test = db.query('UPDATE Product  SET ? WHERE Id=?', [data,Id], function(err,book){
		if(err){
			result(null);
			console.log(err)
		}
		else{
			result({...data});
		}
	})

}
module.exports = Product;