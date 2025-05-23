class Request {
    constructor(requestId, userId, civilServantId, serviceId, status, result, plannedCompletionDate, dateOfSubmission, dateOfCompletion) {
        this.requestId = requestId
        this.userId = userId
        this.civilServantId = civilServantId
        this.serviceId = serviceId
        this.status = status
        this.result = result
        this.plannedCompletionDate = plannedCompletionDate
        this.dateOfSubmission = dateOfSubmission
        this.dateOfCompletion = dateOfCompletion
    }
}

module.exports = Request