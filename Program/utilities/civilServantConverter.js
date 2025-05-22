const CivilServant = require("../models/civilServant")

function fromDatabaseToCivilServant(data) {
    return new CivilServant(data.account_id, data.login, data.password, data.role)
}

module.exports = { fromDatabaseToCivilServant }