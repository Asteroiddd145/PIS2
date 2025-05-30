const requestStatus = require("../constants/requestStatus")
const civilServantRepository = require("../repositories/civilServant.repository")
const serviceRepository = require("../repositories/service.repository")
const requestRepository = require("../repositories/request.repository")
const Errors = require("../errors")

class CivilServantService {
    async tryLogin(login, password) {
        const civilServant = await civilServantRepository.findByLogin(login)
        if (civilServant) {
            if (civilServant.password === password) {
                return civilServant.accountId
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
        const service = await serviceRepository.findById(request.serviceId)
        if (request) {
            return  { request, service }
        } else {
            throw new Errors.RequestNotExist()
        }
    }

    async getAllRequestsByStatus(status, civilServantId) {
        const requests = await requestRepository.getAllByStatus(status)
        const allServices = await serviceRepository.getAll()

        const filteredRequests = civilServantId
            ? requests.filter(r => r.civilServantId === civilServantId)
            : requests

        const sortedRequests = filteredRequests.sort((a, b) => new Date(a.dateOfSubmission) - new Date(b.dateOfSubmission))

        const requestsWithServices = sortedRequests.map(request => {
            const service = allServices.find(s => s.serviceId === request.serviceId)
            return { request, service }
        })

        return requestsWithServices
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

    async changeRequestStatus(requestId, status) {
        const request = await requestRepository.findById(requestId)
        if (request) {
            request.status = status
            if (status === requestStatus.DONE || status === requestStatus.REJECTED) {
                request.dateOfCompletion = new Date()
            } else if (status === requestStatus.IN_PROGRESS) {
                request.dateOfCompletion = null
            }
            await requestRepository.update(requestId, request)
        } else {
            throw new Errors.RequestNotExist()
        }
    }
}

module.exports = new CivilServantService()