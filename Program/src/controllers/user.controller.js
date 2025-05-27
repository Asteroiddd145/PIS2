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
            return res.json({"user": user})
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
            req.session.warningMessage = "Профиль обновлён."
            return res.json({ redirect: "/user/requests" })
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: "/user/requests" })
        }
    }

    async getServices(req, res) {
        const services = await userService.getAllActiveServices()
        return res.json({"services": services})
    }

    async getServiceAndRules(req, res) {
        try {
            const serviceId = req.params.serviceId
            const {service, rules} = await userService.getServiceAndRules(serviceId)
            return res.json({"service": service, "rules": rules})
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: "/user/services" })
        }
    }

    async getRequests(req, res) {
        const requests = await userService.getAllRequests(req.session.userId)
        return res.json({"requests": requests})
    }

    async submitRequest(req, res) {
        try {
            const serviceId = req.params.serviceId
            await userService.createRequest(req.session.userId, serviceId)
            req.session.warningMessage = "Заявка подана."
            return res.json({ redirect: "/user/requests" })
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: "/user/profile" })
        }
    }

    async cancelRequest(req, res) {
        try {
            const requestId = req.params.requestId
            await userService.cancelRequest(requestId)
            req.session.warningMessage = "Заявка отменена."
            return res.json({ redirect: "/user/requests" })
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: "/user/requests" })
        }
    }
}

module.exports = new UserController()