const adminService = require("../services/admin.service")
const ruleConverter = require("../utilities/ruleConverter")
const serviceConverter = require("../utilities/serviceConverter")
const Errors = require("../errors")

class AdminController {
    async logIn(req, res) {
        try {
            const {login, password} = req.body
            await adminService.tryLogin(login, password)
            return res.json({"message": "Вход выполнен"})
        } catch (error) {
            Errors.matchAndRespondError(error, req, Errors.AccountNotExist, Errors.AccountWrongPassword)
        }
    }

    async getService(req, res) {
        try {
            const serviceId = req.params.serviceId
            const service = await adminService.getService(serviceId)
            return res.json({"message": "Услуга получена", "service": service})
        } catch (error) {
            Errors.matchAndRespondError(error, req, Errors.ServiceNotExist, Errors.ServiceIsDeactive)
        }
    }
    
    async getServiceAndRules(req, res) {
        try {
            const serviceId = req.params.serviceId
            const {service, rules} = await adminService.getServiceAndRules(serviceId)
            return res.json({"message": "Услуга и её правила получены", "service": service, "rules": rules})
        } catch (error) {
            Errors.matchAndRespondError(error, req, Errors.ServiceNotExist, Errors.ServiceIsDeactive)
        }
    }

    async getAllServices(req, res) {
        const serviceList = await adminService.getAllServices()
        return res.json({"message": "Все услуги получены", "services": serviceList})
    }

    async addService(req, res) {
        const {service, rules} = req.body
        const addedService = serviceConverter.fromJsonToService(service)
        const addedRules = Array.isArray(rules) ? rules.map(rule => ruleConverter.fromJsonToRule(rule)) : []
        const createdService = await adminService.createService(addedService, addedRules)
        return res.json({"message": "Услуга добавлена", "service": createdService})
    }

    async makeServiceInactive(req, res) {
        try {
            const serviceId = req.params.serviceId
            const service = await adminService.deactivateService(serviceId)
            return res.json({"message": "Услуга больше не активна", "service": service})
        } catch (error) {
            Errors.matchAndRespondError(error, req, Errors.ServiceNotExist, Errors.ServiceIsDeactive)
        }   
    }

    async addRuleToService(req, res) {
        try {
            const serviceId = req.params.serviceId
            const rule = req.body
            const savingRule = ruleConverter.fromJsonToRule(rule)
            const createdRule = await adminService.createRule(serviceId, savingRule)
            return res.json({"message": "Правило добавлено", "rule": createdRule})
        } catch (error) {
            Errors.matchAndRespondError(error, req, Errors.ServiceNotExist, Errors.ServiceIsDeactive, Errors.RuleAlreadyExist)
        }
    }

    async editRule(req, res) {
        try {
            const ruleId = req.params.ruleId
            const rule = req.body
            const editingRule = ruleConverter.fromJsonToRule(rule)
            await adminService.updateRule(ruleId, editingRule)
            return res.json({"message": "Правило обновлено"})
        } catch (error) {
            Errors.matchAndRespondError(error, req, Errors.RuleNotExist)
        }
    } 

    async deleteRule(req, res) {
        try {
            const ruleId = req.params.ruleId
            await adminService.deleteRule(ruleId)
            return res.json({"message": "Правило удалено"})
        } catch (error) {
            Errors.matchAndRespondError(error, req, Errors.RuleNotExist)
        }
    } 
}

module.exports = new AdminController()