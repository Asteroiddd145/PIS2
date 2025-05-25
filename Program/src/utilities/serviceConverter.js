const Service = require("../models/service")

function fromJsonToService(data) {
    return new Service(data.serviceId, data.name, data.resultDescription, data.serviceDescription, data.startDateOfValidity, data.endDateOfValidity)
}

function fromDatabasetoService(data) {
    return new Service(data.service_id, data.name, data.result_description, data.service_description, data.start_date_of_validity, data.end_date_of_validity)
}

module.exports = { fromJsonToService, fromDatabasetoService }