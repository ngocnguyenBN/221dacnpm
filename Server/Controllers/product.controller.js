const Product = require('../Models/product.model')

exports.getAll = (req, res) => {
    const result = data => res.send(data)

    Product.getAllProduct(result)
}

exports.getByWord = (req, res) => {
    const result = data => res.send(data)

    Product.getByWord(result,req)
}

exports.getAllDiscountCode = (req, res) => {
    const result = data => res.send(data)

    Product.getAllDiscountCode(result)
}

exports.getCompreInforProduct = (req, res) => {
    const result = data => res.send(data)

    Product.getCompreInforProduct(result)
}

exports.getCompreAllProduct = (req, res) => {
    const result = data => res.send(data)

    Product.getCompreAllProduct(result)
}