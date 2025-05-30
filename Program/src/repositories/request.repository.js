const db = require("../../db")
const requestConverter = require("../utilities/requestConverter")

class RequestRepository {
    async getAll() {
        const result = await db.query(
            "SELECT * FROM requests ORDER BY date_of_submission"
        )

        const rows = result.rows
        if (rows.length > 0) {
            const list = rows.map(row => requestConverter.fromDatabasetoRequest(row))
            return list
        }
        return []
    }

    async getAllByStatus(status) {
        const result = await db.query(
            "SELECT * FROM requests WHERE status = $1", 
            [status]
        )
        const rows = result.rows
        if (rows.length > 0) {
            const list = rows.map(row => requestConverter.fromDatabasetoRequest(row))
            return list
        }
        return []
    }

    async findById(requestId) {
        const result = await db.query(
            "SELECT * FROM requests WHERE request_id = $1", 
            [requestId]
        )

        const row = result.rows[0]
        if (row) {
            const request = requestConverter.fromDatabasetoRequest(row)
            return request
        }
        return null
    }

    async save(request) {
        const result = await db.query(
            "INSERT INTO requests (user_id, civil_servant_id, service_id, status, result, planned_completion_date, date_of_submission, date_of_completion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING request_id",
            [request.userId, request.civilServantId, request.serviceId, request.status, request.result, request.plannedCompletionDate, request.dateOfSubmission, request.dateOfCompletion]
        )
        return result.rows[0].request_id
    }

    async update(requestId, request) {
        await db.query(
            "UPDATE requests SET user_id = $1, civil_servant_id=$2, service_id = $3, status = $4, result = $5, planned_completion_date = $6, date_of_submission = $7, date_of_completion = $8 WHERE request_id = $9",
            [request.userId, request.civilServantId, request.serviceId, request.status, request.result, request.plannedCompletionDate, request.dateOfSubmission, request.dateOfCompletion, requestId]
        )
    }
}

module.exports = new RequestRepository()