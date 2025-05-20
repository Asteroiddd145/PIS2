const db = require("../db")
const Request = require("../models/request")

class RequestRepository {
    async getAllByStatus(status) {
        const result = await db.query(
            "SELECT * FROM requests WHERE status = $1", 
            [status]
        )

        const rows = result.rows
        if (rows.length !== 0) {
            const list = rows.map(row => new Request(row.request_id, row.account_id, row.service_id, row.status, row.result, row.planned_completion_date, row.date_of_submission, row.date_of_completion))
            return list
        }
        return null
    }

    async findById(requestId) {
        const result = await db.query(
            "SELECT * FROM requests WHERE request_id = $1", 
            [requestId]
        )

        const row = result.rows[0]
        if (row) {
            const request = new Request(row.request_id, row.account_id, row.service_id, row.status, row.result, row.planned_completion_date, row.date_of_submission, row.date_of_completion)
            return request
        }
        return null
    }

    async save(request) {
        const result = await db.query(
            "INSERT INTO requests (account_id, service_id, status, result, planned_completion_date, date_of_submission, date_of_completion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING request_id",
            [request.userId, request.serviceId, request.status, request.result, request.plannedCompletionDate, request.dateOfSubmission, request.dateOfCompletion]
        )
        return result.rows[0].request_id
    }

    async update(requestId, request) {
        await db.query(
            "UPDATE requests SET account_id = $1, service_id = $2, status = $3, result = $4, planned_completion_date = $5, date_of_submission = $6, date_of_completion = $7 WHERE request_id = $8",
            [request.userId, request.serviceId, request.status, request.result, request.plannedCompletionDate, request.dateOfSubmission, request.dateOfCompletion, requestId]
        )
    }
}

module.exports = new RequestRepository()