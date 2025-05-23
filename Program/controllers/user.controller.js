const userService = require("../services/user.service")
const userConverter = require("../utilities/userConverter")
const Errors = require("../errors")

class User {
    async signUp(req, res) {
        try {
            const {login, password} = req.body
            await userService.trySignUp(login, password)
            return res.json({"message": "Аккаунт зарегистрирован"})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.LoginAlreadyExist)
        }
    }

    async logIn(req, res) {
        try {
            const {login, password} = req.body
            await userService.tryLogin(login, password)
            return res.json({"message": "Вход выполнен"})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.AccountNotExist, Errors.AccountWrongPassword)
        }
    }

    async getUserProfile(req, res) {
        try {
            const userId = req.params.id
            const user = await userService.getUser(userId)
            return res.json({"message": "Пользователь получен", "user": user})
        } catch {
            Errors.matchAndRespondError(error, res, Errors.UserNotExist)
        }
    }

    async applyUserChanges(req, res) {
        try {
            const userId = req.params.id
            const user = req.body
            const editingUser = userConverter.fromJsonToUser(user)
            await userService.updateUser(userId, editingUser)
            return res.json({"message": "Профиль обновлён"})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.UserNotExist)
        }
    }

    async getServices(req, res) {
        const services = await userService.getAllActiveServices()
        return res.json({"message": "Услуги получены", "services": services})
    }

    async getService(req, res) {
        try {
            const serviceId = req.params.serviceId
            const service = await userService.getService(serviceId)
            return res.json({"message": "Услуга получена", "service": service})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.ServiceNotExist, Errors.ServiceIsDeactive)
        }
    }

    async getServiceAndRules(req, res) {
        try {
            const serviceId = req.params.serviceId
            const {service, rules} = await userService.getServiceAndRules(serviceId)
            return res.json({"message": "Услуга и её правила получены", "service": service, "rules": rules})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.ServiceNotExist, Errors.ServiceIsDeactive)
        }
    }

    async getRequests(req, res) {
        const userId = req.params.id
        const requests = await userService.getAllRequests(userId)
        return res.json({"message": "Заявки получены", "requests": requests})
    }

    async getRequest(req, res) {
        try {
            const requestId = req.params.requestId
            const request = await userService.getRequest(requestId)
            return res.json({"message": "Заявка получена", "request": request})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.RequestNotExist)
        }
    }

    async submitRequest(req, res) {
        try {
            const userId = req.params.id
            const serviceId = req.params.serviceId
            const request = await userService.createRequest(userId, serviceId)
            return res.json({"message": "Заявка подана", "request": request})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.ServiceNotExist, Errors.ServiceIsDeactive)
        }
    }

    async cancelRequest(req, res) {
        try {
            const requestId = req.params.requestId
            await userService.cancelRequest(requestId)
            return res.json({"message": "Заявка отменена"})
        } catch (error) {
            Errors.matchAndRespondError(error, res, Errors.RequestNotExist, Errors.RequestAlreadyBeingProcessed)
        }
    }
}

module.exports = new User()