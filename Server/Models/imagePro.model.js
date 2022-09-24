const db = require('../Config/ConnectMySql')

const ImgProduct = function (imgproduct) {
    this.Id = imgproduct.Id
    this.Url = imgproduct.Url
    this.Id_Product = imgproduct.Id_Product
}

ImgProduct.get_all = function(result){
	db.query("SELECT * FROM ImageProduct", function(err,book){
		if(err) {
			result(null);
		}
		else result(book);
	});
}

ImgProduct.getById = function(id, result){
	db.query("SELECT Id,Url FROM ImageProduct WHERE Id_Product= ?",id, function(err,book){
		if(err || book.length==0) {
			result(null);
		}
		else result(book);
	});
}

// ImgProduct.create = function(data, result){
// 	console.log(data)
// 	db.query('INSERT INTO ImageProduct  SET ?', data, function(err,book){
// 		if(err){
// 			result(null);
// 		}
// 		else{
// 			result({...data});
// 		}
// 	})

// }
ImgProduct.create = function(data){
	// console.log(data)
	db.query('INSERT INTO ImageProduct  SET ?', data)

}
ImgProduct.remove = function(Id_pro, result){
	db.query('DELETE FROM ImageProduct WHERE Id_Product=?', Id_pro)
}
ImgProduct.update = function([data,Id_pro,Id]){
	db.query('UPDATE ImageProduct  SET ? WHERE Id_Product=? AND Id=?', [data,Id_pro,Id])
}
module.exports = ImgProduct;