const Account = require("./account")

class Admin extends Account {
    constructor(accountId, login, password, role) {
        super(accountId, login, password, role)
    }
}

module.exports = Admin