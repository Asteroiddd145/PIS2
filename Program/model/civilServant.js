const Account = require("./account")

class CivilServant extends Account {
    constructor(accountId, login, password, role) {
        super(accountId, login, password, role)
    }
}

module.exports = CivilServant