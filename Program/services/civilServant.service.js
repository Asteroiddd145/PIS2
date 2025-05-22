const requestStatus = require("../constants/requestStatus")
const civilServantRepository = require("../repositories/civilServant.repository")
const requestRepository = require("../repositories/request.repository")
const Request = require("../models/request")
const Errors = require("../errors")

class CivilServantService {
    async tryLogin(login, password) {
        return new Errors.AccountNotExist()
    }

    async getAllRequestsByStatus(status) {
        return [
            new Request(),
            new Request(),
            new Request()
        ]
    }

    async attachRequestResult(requestId, result) {
        
    }

    async changeRequestStatus(requestId, status) {
        
    }
}

module.exports = new CivilServantService()