const loginStatus = require("../constants/loginStatus")
const adminService = require("../services/admin.service")
const ruleConverter = require("../utilities/ruleConverter")
const serviceConverter = require("../utilities/serviceConverter")

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

    async getService(req, res) {
        const serviceId = req.params.id
        const service = await adminService.getService(serviceId)
        return res.json(service)
    }
    
    async getServiceAndRules(req, res) {
        const serviceId = req.params.id
        const {service, rules} = await adminService.getServiceAndRules(serviceId)
        return res.json({ service, rules })
    }

    async getAllServices(req, res) {
        const list = await adminService.getAllServices()
        return res.json(list)
    }

    async addService(req, res) {
        const {service, rules} = req.body
        
        const addedService = serviceConverter.fromJsonToService(service)
        
        const addedRules = Array.isArray(rules) ? rules.map(rule => ruleConverter.fromJsonToRule(rule)) : []
        
        const createdService = await adminService.createService(addedService, addedRules)
        return res.json(createdService)
    }

    async makeServiceInactive(req, res) {
        const serviceId = req.params.id
        await adminService.deactivateService(serviceId)
        return res.json("ok")
    }

    async addRuleToService(req, res) {
        const serviceId = req.params.id
        const rule = req.body
        const savingRule = ruleConverter.fromJsonToRule(rule)
        const createdRule = await adminService.createRule(serviceId, savingRule)
        return res.json(createdRule)
    }

    async editRule(req, res) {
        const ruleId = req.params.ruleId
        const rule = req.body
        const editingRule = ruleConverter.fromJsonToRule(rule)
        const updatedRule = await adminService.updateRule(ruleId, editingRule)
        return res.json(updatedRule)
    } 

    async deleteRule(req, res) {
        const ruleId = req.params.ruleId
        await adminService.deleteRule(ruleId)
        return res.json("ok")
    } 
}

module.exports = new AdminController()