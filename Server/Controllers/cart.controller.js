var Cart = require('../Models/cart.model')
var Belongtocart = require('../Models/belongtocart.model')

exports.add = function(req, res){
	var data =req.body;
    let infocart ={
        "Name_Client" : data.info.name,
        "Phone_Client" : data.info.phone,
        "Address_Client": data.info.address,
        "Email_Client": data.info.email,
        "Pay_Method":data.info.paymethod,
        "Buy_Time": data.info.buytime
    }
    let belongtocart =data.info.belongtocart.map((item) => {return {
        "Id_Product": item.id,
        "Quantity": item.quantity
    }})
	Cart.create(infocart, function(response){
		belongtocart.map((belongtocart)=>{
			belongtocart.Id_Cart = response.Id;
			Belongtocart.create(belongtocart);
		})
		res.send({result: response});
	});
}