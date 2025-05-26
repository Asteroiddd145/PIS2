const User = require("../models/user")

function fromJsonToUser(data) {
    return new User(data.accountId, null, null, null, data.userId, data.firstName, data.patronymic, data.lastName, data.inn, data.passportNumber, data.passportSeries, data.dateOfBirth, data.citizenship, data.email)
}

function fromDatabaseToUser(data) {
    return new User(null, null, null, null, data.user_id, data.first_name, data.patronymic, data.last_name, data.inn, data.passport_number, data.passport_series, data.date_of_birth, data.citizenship, data.email)
}

module.exports = { fromJsonToUser, fromDatabaseToUser }