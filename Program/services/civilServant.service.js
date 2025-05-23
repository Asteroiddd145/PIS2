const requestStatus = require("../constants/requestStatus")
const civilServantRepository = require("../repositories/civilServant.repository")
const requestRepository = require("../repositories/request.repository")
const Errors = require("../errors")

class CivilServantService {
    async tryLogin(login, password) {
        const civilServant = await civilServantRepository.findByLogin(login)
        if (civilServant) {
            if (civilServant.password === password) {
                return true
            } else {
                throw new Errors.AccountWrongPassword()
            }
        } else {
            throw new Errors.AccountNotExist()
        }
    }

    async linkRequestWithResponsible(civilServantId, requestId) {
        const request = await requestRepository.findById(requestId)
        if (request) {
            if (request.status === requestStatus.WAITING) {
                request.status = requestStatus.IN_PROGRESS
                request.civilServantId = civilServantId
                await requestRepository.update(requestId, request)
            } else {
                throw new Errors.RequestNotAvailable()
            }
        } else {
            throw new Errors.RequestNotExist()
        }
    }

    async getRequest(requestId) {
        const request = await requestRepository.findById(requestId)
        if (request) {
            return request
        } else {
            throw new Errors.RequestNotExist()
        }
    }

    async getAllRequestsByStatus(status) {
        const list = await requestRepository.getAllByStatus(status)
        return list
    }

    async changeRequestStatus(requestId, status) {
        const request = await requestRepository.findById(requestId)
        if (request) {
            request.status = status
            await requestRepository.update(requestId, request)
        } else {
            throw new Errors.RequestNotExist()
        }
    }

    async attachRequestResult(requestId, result) {
        const request = await requestRepository.findById(requestId)
        if (request) {
            request.result = result
            await requestRepository.update(requestId, request)
        } else {
            throw new Errors.RequestNotExist()
        }
    }
}

module.exports = new CivilServantService()