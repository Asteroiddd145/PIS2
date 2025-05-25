const userService = require("../services/user.service")
const userConverter = require("../utilities/userConverter")
const User = require("../models/user")

class UserController {
    async signUp(req, res) {
        try {
            const {firstName, lastName, email, login, password} = req.body
            const user = new User(null, login, password, null, firstName, null, lastName, null, null, null, null, null, email)
            await userService.trySignUp(user)
            res.redirect("/user/login") 
        } catch (error) {
            req.session.errorMessage = error.message
            res.redirect("/user/signup") 
        }
    }

    async logIn(req, res) {
        try {
            const {login, password} = req.body
            const userId = await userService.tryLogin(login, password)
            req.session.userId = userId
            res.redirect("/user/services")
        } catch (error) {
            req.session.errorMessage = error.message
            res.redirect("/user/login")
        }
    }

    async getUserProfile(req, res) {
        try {
            const userId = req.session.userId
            const user = await userService.getUser(userId)
            return res.json({"message": "Пользователь получен", "user": user})
        } catch {
            req.session.errorMessage = error.message
        }
    }

    async applyUserChanges(req, res) {
        try {
            const userId = req.session.userId
            const user = req.body
            const editingUser = userConverter.fromJsonToUser(user)
            await userService.updateUser(userId, editingUser)
            return res.json({"message": "Профиль обновлён"})
        } catch (error) {
            req.session.errorMessage = error.message
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
            req.session.errorMessage = error.message
        }
    }

    async getServiceAndRules(req, res) {
        try {
            const serviceId = req.params.serviceId
            const {service, rules} = await userService.getServiceAndRules(serviceId)
            return res.json({"message": "Услуга и её правила получены", "service": service, "rules": rules})
        } catch (error) {
            req.session.errorMessage = error.message
        }
    }

    async getRequests(req, res) {
        const userId = req.session.userId
        const requests = await userService.getAllRequests(userId)
        return res.json({"message": "Заявки получены", "requests": requests})
    }

    async getRequest(req, res) {
        try {
            const requestId = req.params.requestId
            const request = await userService.getRequest(requestId)
            return res.json({"message": "Заявка получена", "request": request})
        } catch (error) {
            req.session.errorMessage = error.message
        }
    }

    async submitRequest(req, res) {
        try {
            const userId = req.session.userId
            const serviceId = req.params.serviceId
            const request = await userService.createRequest(userId, serviceId)
            return res.json({"message": "Заявка подана", "request": request})
        } catch (error) {
            req.session.errorMessage = error.message
        }
    }

    async cancelRequest(req, res) {
        try {
            const requestId = req.params.requestId
            await userService.cancelRequest(requestId)
            return res.json({"message": "Заявка отменена"})
        } catch (error) {
            req.session.errorMessage = error.message
        }
    }
}

module.exports = new UserController()