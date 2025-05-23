const civilServantService = require("../services/civilServant.service")
const Errors = require("../errors")

class CivilServant {
    async logIn(req, res) {
        try {
            const {login, password} = req.body
            await civilServantService.tryLogin(login, password)
            return res.json({"message": "Вход выполнен"})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.AccountNotExist, Errors.AccountWrongPassword)
        }
    }

    async processRequest(req, res) {
        try {
            const civilServantId = req.params.id
            const requestId = req.params.requestId
            await civilServantService.linkRequestWithResponsible(civilServantId, requestId)
            return res.json({"message": "Заявка готова к обработке"})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.RequestNotExist, Errors.RequestNotAvailable)
        }
    }

    async getRequest(req, res) {
        try {
            const requestId = req.params.requestId
            const request = await civilServantService.getRequest(requestId)
            return res.json({"message": "Заявка получена", "request": request})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.RequestNotExist)
        }  
    }

    async getAllRequests(req, res) {
        const status = req.body.status  
        const requestList = await civilServantService.getAllRequestsByStatus(status)
        return res.json({"message": "Все заявки по статусу получены", "requests": requestList})
    }

    async changeRequestStatus(req, res) {
        try {
            const requestId = req.params.requestId
            const status = req.body.status
            await civilServantService.changeRequestStatus(requestId, status)
            return res.json({"message": "Статус изменён"})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.RequestNotExist)
        }
    }

    async attachResultToRequest(req, res) {
        try {
            const requestId = req.params.requestId
            const result = req.body.result
            await civilServantService.attachRequestResult(requestId, result)
            return res.json({"message": "Результат прикреплён"})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.RequestNotExist)
        }
    }
}

module.exports = new CivilServant()