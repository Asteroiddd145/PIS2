class Request {
    constructor(user, service, status, result, plannedCompletionDate, dateOfSubmission, dateOfCompletion) {
        this.user = user
        this.service = service
        this.status = status
        this.result = result
        this.plannedCompletionDate = plannedCompletionDate
        this.dateOfSubmission = dateOfSubmission
        this.dateOfCompletion = dateOfCompletion
    }
}

module.exports = Request