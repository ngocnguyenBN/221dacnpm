const db = require('../Config/ConnectMySql')

const Memory = function (memory) {
    this.Id = memory.Id
    this.Id_Product = memory.Id_Product
	this.Rom_Capacity = memory.Rom_Capacity
	this.Ram_Capacity = memory.Ram_Capacity
	this.Price = memory.Price
}

Memory.get_all = function(result){
	db.query("SELECT * FROM memory", function(err,book){
		if(err) {
			result(null);
		}
		else result(book);
	});
}

Memory.create = function(data,result){
	db.query('INSERT INTO memory  SET ?', data );
}

Memory.getById = function(id, result){
	db.query("SELECT Id,Rom_Capacity, Ram_Capacity, Price FROM memory WHERE Id_Product= ?",id, function(err,book){
		if(err || book.length==0) {
			result(null);
		}
		else result(book);
	});
}

Memory.remove = function(Id_pro){
	db.query('DELETE FROM memory WHERE Id_Product=?', Id_pro)
}
Memory.update = function( [data,Id_pro,Id]){
	db.query("SELECT Id,Rom_Capacity, Ram_Capacity, Price FROM memory WHERE Id_Product= ? AND ID=?",[Id_pro,Id], function(err,book){
		if(book.length==0) {
			data.Id_Product=Id_pro;
			Memory.create(data)
		}
		else {
			db.query('UPDATE memory  SET ? WHERE Id_Product=? AND Id=?', [data,Id_pro,Id])
		}
	});
	
}
module.exports = Memory;