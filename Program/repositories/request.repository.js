const db = require("../db")
const Request = require("../model/request")

class RequestRepository {
    async getAllByStatus(status) {
        return [
            new Request(),
            new Request(),
            new Request()
        ]
    }

    async findById(requestId) {
        return new Request()
    }

    async save(request) {
        return -1
    }

    async update(requestId, request) {
        
    }
}

module.exports = new RequestRepository()