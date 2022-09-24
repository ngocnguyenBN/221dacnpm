const mySql = require('../Config/ConnectMySql')

const Product = function (procduct) {
    this.id = procduct.id
    this.productType = procduct.productType
    this.productName = procduct.productName
    this.color = procduct.color
    this.discount = procduct.discount
    this.productDesc = procduct.productDesc
    this.specFeature = procduct.specFeature
    this.batery = procduct.batery
    this.os = procduct.os
    this.displaySize = procduct.displaySize
    this.chip = procduct.chip
    this.inStock = procduct.inStock
}

Product.create = (newProduct, result) => {
    mySql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }
        console.log('Insert successfully !!!!')
    })
}

Product.getAllProduct = (result) => {
    let query = "SELECT * FROM product";

    mySql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }

        console.log("getAllProduct: ", res);
        result(res)
    });
};

Product.getByWord = (result,req) => {
    let query = "SELECT product.Product_Name, product.DisplaySize, product.Discount,\
    imageproduct.Url, memory.Rom_Capacity, memory.Ram_Capacity, memory.Price \
    FROM `product` JOIN `memory` JOIN `imageproduct` \
    WHERE product.Id = memory.Id_Product AND product.Id = imageproduct.Id_Product AND product.Product_Name REGEXP ?\
    GROUP BY product.Product_Name";

    console.log(req.params.id)
    let keyWord = `.*${req.params.id}.*`

    mySql.query(query, keyWord, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }

        console.log("getByWord: ", res);
        result(res)
    });
};

Product.getAllDiscountCode = (result) => {
    let query = "SELECT product.Product_Name, discountCode.Id_Discount, discountCode.Price \
    FROM `product` JOIN `discountCode`\
    WHERE product.Id = discountCode.Id_Product";

    mySql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }

        console.log("products: ", res);
        result(res)
    });
};

Product.getCompreInforProduct = (result) => {
    let query = ' SELECT product.Id, product.Product_Name, product.DisplaySize, product.Discount, product.Color, product.battery, product.Os, product.chip, product.InStock, product.Product_Type,\
    imageproduct.Url, memory.Rom_Capacity, memory.Ram_Capacity, memory.Price \
    FROM `product` JOIN `memory` JOIN `imageproduct` \
    WHERE product.Id = memory.Id_Product AND product.Id = imageproduct.Id_Product'
    mySql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }

        console.log("getCompreInforProduct: ", res);
        result(res)
    });
}

Product.getCompreAllProduct = (result) => {
    let query = 'SELECT product.Product_Name, product.DisplaySize,\
    product.Discount, product.Color, product.battery, product.Os, product.chip,\
    product.InStock, product.Product_Type, imageproduct.Url, memory.Rom_Capacity, memory.Ram_Capacity, memory.Price \
    FROM `product` JOIN `memory` JOIN `imageproduct` \
    WHERE product.Id = memory.Id_Product AND product.Id = imageproduct.Id_Product GROUP BY product.Product_Name';
    mySql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }

        console.log("getCompreAllProduct: ", res);
        result(res)
    });
}

module.exports = Product