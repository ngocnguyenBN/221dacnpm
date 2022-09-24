const mySql = require('../Config/ConnectMySql')

const Account = function (procduct) {
    this.account = procduct.account
    this.password = procduct.passwothis.password
}

Account.checkLogin = (result, acc , pass) => {
    mySql.query("SELECT * FROM `account` WHERE account.User_Account = ? AND account.User_Password = ?", [acc, pass], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }

        if (res.length === 0) result('Reject')
        else result('Accept')
    })
}

module.exports = Account