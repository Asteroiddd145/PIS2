const Admin = require("../models/admin")

function fromDatabaseToAdmin(data) {
    return new Admin(data.account_id, data.login, data.password, data.role)
}

module.exports = { fromDatabaseToAdmin }