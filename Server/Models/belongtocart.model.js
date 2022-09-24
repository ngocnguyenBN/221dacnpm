const db = require('../Config/ConnectMySql')

const Belongtocart = function (belongtocart) {
	this.Id_Product = belongtocart.Id_Product
	this.Quantity = belongtocart.Quantity
	this.Id_Cart = belongtocart.Id_Cart
}

Belongtocart.create = function(data, result){
	db.query('INSERT INTO BelongtoCart  SET ?', data)

}

module.exports = Belongtocart;