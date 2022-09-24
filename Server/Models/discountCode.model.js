const db = require('../Config/ConnectMySql')

const Discount = function (discount) {
	this.Id_Product = discount.Id_Product
    this.Id_Discount = discount.Id_Discount
	this.Price = discount.Price
}

Discount.get_all = function(result){
	db.query("SELECT * FROM discountcode", function(err,book){
		if(err) {
			result(null);
		}
		else result(book);
	});
}

Discount.create = function(data, result){
	db.query('INSERT INTO discountcode  SET ?', data)

}

Discount.getById = function(id, result){
	db.query("SELECT Id_Discount, Price FROM discountcode WHERE Id_Product=?",id, function(err,book){
		if(err || book.length==0) {
			result(null);
		}
		else result(book[0]);
	});
}

Discount.remove = function(Id_pro, result){
	db.query('DELETE FROM discountcode WHERE Id_Product=?', Id_pro)
}
Discount.update = function([data,Id_pro,Id_dis]){
	db.query("SELECT * FROM discountcode WHERE Id_Product=?",Id_pro, function(err,book){
		if(book.length==0) {
			data.Id_Product=Id_pro;
			Discount.create(data)
		}
		else{
			console.log("Update :" , data,Id_pro )
			db.query('UPDATE discountcode  SET ? WHERE Id_Product=?', [data,Id_pro])
		}
	});
}
module.exports = Discount;