const Account = require("../models/account")
const Admin = require("../models/admin")
const CivilServant = require("../models/civilServant")
const User = require("../models/user")

function fromDatabaseToAccount(data) {
    return new Account(data.account_id, data.login, data.password, data.role)
}

function fromAccountToAdmin(account) {
    return new Admin(account.accountId, account.login, account.password, account.role)
}

function fromAccountToCivilServant(account) {
    return new CivilServant(account.accountId, account.login, account.password, account.role)
}

function fromAccountToUser(account) {
    return new User(account.accountId, account.login, account.password, account.role)
}

module.exports = { fromDatabaseToAccount, fromAccountToAdmin, fromAccountToCivilServant, fromAccountToUser }