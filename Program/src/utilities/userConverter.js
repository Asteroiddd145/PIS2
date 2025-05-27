const User = require("../models/user")

function fromJsonToUser(data) {
    return new User(data.accountId, null, null, null, data.userId, data.firstName, data.patronymic, data.lastName, data.inn, data.passportNumber, data.passportSeries, data.dateOfBirth, data.citizenship, data.email, data.purposeOfArrival, data.dateOfEntry, data.isHQS, data.isCompatriotProgramMember, data.wasPreviouslyRegistered, data.wasFingerprintRegistration)
}

function fromDatabaseToUser(data) {
    return new User(null, null, null, null, data.user_id, data.first_name, data.patronymic, data.last_name, data.inn, data.passport_number, data.passport_series, data.date_of_birth, data.citizenship, data.email, data.purpose_of_arrival, data.date_of_entry, data.is_hqs, data.is_compatriot_program_member, data.was_previously_registered, data.was_fingerprint_registration)
}

module.exports = { fromJsonToUser, fromDatabaseToUser }