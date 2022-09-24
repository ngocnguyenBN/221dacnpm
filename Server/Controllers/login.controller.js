const Account = require('../Models/login.model')

exports.checkLogin = (req, res) => {
    const result = data => res.send(data)

    Account.checkLogin(result, req.body.acc, req.body.pass)
}
