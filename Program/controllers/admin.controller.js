const loginStatus = require("../constants/loginStatus")

const adminService = require("../services/admin.service")

class AdminController {
    async logIn(req, res) {
        const {login, password} = req.body
        
        const loginResult = await adminService.tryLogin(login, password)

        if (loginResult === loginStatus.NOT_FOUND) {
            return res.json("Ошибка! Не найден аккаунт.")
        }

        if (loginResult === loginStatus.WRONG_PASSWORD) {
            return res.json("Ошибка! Указан неверный пароль.")
        }

        if (loginResult === loginStatus.SUCCESS) {
            return res.json("Вход выполнен!")
        }
    }

    addService(service, addedRules) {
        
    }

    makeServiceInactive(serviceId) {

    }

    addRuleToService(serviceId, rule) {
        
    }

    deleteRule(ruleId) {

    }

    editRule(ruleId, rule) {

    }    
}

module.exports = new AdminController()