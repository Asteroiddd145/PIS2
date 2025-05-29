const civilServantService = require("../services/civilServant.service")

class CivilServant {
    async logIn(req, res) {
        try {
            const {login, password} = req.body
            const civilServantId = await civilServantService.tryLogin(login, password)
            req.session.civilServantId = civilServantId
            req.session.save()
            res.redirect("/civilservant/requests")
        } catch (error) {
            req.session.errorMessage = error.message
            res.redirect("/admin/login")
        }
    }

    async processRequest(req, res) {
        try {
            const requestId = req.params.requestId
            await civilServantService.linkRequestWithResponsible(req.session.civilServantId, requestId)
            return res.json({ redirect: `/civilservant/requests/${requestId}`})
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: `/civilservant/requests`})
        }
    }

    async getRequest(req, res) {
        try {
            const requestId = req.params.requestId
            const requestAndService = await civilServantService.getRequest(requestId)
            return res.json(requestAndService)
        } catch (error) {
            req.session.errorMessage = error.message
            res.redirect("/civilservant/requests")
        }
    }

    async getAllRequests(req, res) {
        const status = req.query.status
        const needCivilServantId = req.query.need
        const requests = await civilServantService.getAllRequestsByStatus(status, needCivilServantId ? req.session.civilServantId : null)
        return res.json({"requests": requests})
    }

    async changeRequestStatus(req, res) {
        try {
            const requestId = req.params.requestId
            const status = req.body.status
            await civilServantService.changeRequestStatus(requestId, status)
            req.session.warningMessage = "Статус изменён."
            return res.json({ redirect: `/civilservant/requests/${requestId}`})
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: `/civilservant/requests/${requestId}`})
        }
    }

    async attachResultToRequest(req, res) {
        try {
            const requestId = req.params.requestId
            const result = req.body.result
            await civilServantService.attachRequestResult(requestId, result)
            req.session.warningMessage = "Результат прикреплён."
            return res.json({ redirect: `/civilservant/requests/${requestId}`})
        } catch (error) {
            return res.json({ redirect: `/civilservant/requests/${requestId}`})
        }
    }
}

module.exports = new CivilServant()