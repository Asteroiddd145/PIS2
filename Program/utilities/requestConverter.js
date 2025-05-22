const Request = require("../models/request")

function fromJsonToRequest(data) {
    return new Request(data.requestId, data.userId, data.serviceId, data.status, data.result, data.plannedCompletionDate, data.dateOfSubmission, data.dateOfCompletion)
}

function fromDatabasetoRequest(data) {
    return new Request(data.request_id, data.account_id, data.service_id, data.status, data.result, data.planned_completion_date, data.date_of_submission, data.date_of_completion)
}

module.exports = { fromJsonToRequest, fromDatabasetoRequest }