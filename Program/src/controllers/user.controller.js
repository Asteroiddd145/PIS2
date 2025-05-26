const userService = require("../services/user.service")
const userConverter = require("../utilities/userConverter")
const User = require("../models/user")

class UserController {
    async signUp(req, res) {
        try {
            const {firstName, lastName, email, login, password} = req.body
            const user = new User(null, login, password, null, null, firstName, null, lastName, null, null, null, null, null, email)
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
            req.session.save()
            res.redirect("/user/services")
        } catch (error) {
            req.session.errorMessage = error.message
            res.redirect("/user/login")
        }
    }

    async getUserProfile(req, res) {
        try {
            const user = await userService.getUser(req.session.userId)
            console.log(user)
            return res.json({"message": "Пользователь получен", "user": user})
        } catch (error) {
            req.session.errorMessage = error.message
        }
    }

    async applyUserChanges(req, res) {
        try {
            const user = req.body
            user.userId = req.session.userId
            const editingUser = userConverter.fromJsonToUser(user)
            await userService.updateUser(req.session.userId, editingUser)
            res.redirect("/user/services")
        } catch (error) {
            req.session.errorMessage = error.message
            res.redirect("/user/services")
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
            res.redirect("/user/services")
        }
    }

    async getServiceAndRules(req, res) {
        try {
            const serviceId = req.params.serviceId
            const {service, rules} = await userService.getServiceAndRules(serviceId)
            return res.json({"message": "Услуга и её правила получены",  "service": service, "rules": rules})
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: "/user/services" })
        }
    }

    async getRequests(req, res) {
        const requests = await userService.getAllRequests(req.session.userId)
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
            const serviceId = req.params.serviceId
            const request = await userService.createRequest(req.session.userId, serviceId)
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