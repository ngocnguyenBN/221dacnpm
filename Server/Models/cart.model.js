const db = require('../Config/ConnectMySql')

const Cart = function (cart) {
    this.Id_Cart = cart.Id_Cart
	this.Name_Client =cart.Name_Client	
	this.Address_Client = cart.Address_Client
	this.Phone_Client = cart.Phone_Client
	this.Email_Client = cart.Email_Client		
	this.Pay_Method	= cart.Pay_Method		
	this.Buy_Time = cart.Buy_Time
}

Cart.create = function(data, result){
	db.query('INSERT INTO cart SET ?', data, function(err,book){
        if(err){
			result(err);
		}
		else{
			result({Id:book.insertId, ...data});
		}
	})
}

module.exports = Cart;