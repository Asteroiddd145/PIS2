const User = require("../models/user")

function fromJsonToUser(data) {
    return new User(data.accountId, data.firstName, data.patronymic, data.lastName, data.inn, data.passportNumber, data.passportSeries, data.dateOfBirth, data.citizenship, data.email)
}

function fromDatabaseToUser(data) {
    return new User(data.account_id, data.login, data.password, data.role, data.first_name, data.patronymic, data.last_name, data.inn, data.passport_number, data.passport_series, data.date_of_birth, data.citizenship, data.email)
}

module.exports = { fromJsonToUser, fromDatabaseToUser }