const adminService = require("../services/admin.service")
const ruleConverter = require("../utilities/ruleConverter")
const serviceConverter = require("../utilities/serviceConverter")

class AdminController {
    async logIn(req, res) {
        try {
            const {login, password} = req.body
            const adminId = await adminService.tryLogin(login, password)
            req.session.adminId = adminId
            req.session.save()
            res.redirect("/admin/services")
        } catch (error) {
            req.session.errorMessage = error.message
            res.redirect("/admin/login")
        }
    }
    
    async getServiceAndRules(req, res) {
        try {
            const serviceId = req.params.serviceId
            const {service, rules} = await adminService.getServiceAndRules(serviceId)
            return res.json({"service": service, "rules": rules})
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: "/admin/services" })
        }
    }

    async getAllServices(req, res) {
        const serviceList = await adminService.getAllServices()
        return res.json({"services": serviceList})
    }

    async addService(req, res) {
        const {service, rules} = req.body
        const addedService = serviceConverter.fromJsonToService(service)
        const addedRules = Array.isArray(rules) ? rules.map(rule => ruleConverter.fromJsonToRule(rule)) : []
        const serviceId = await adminService.createService(addedService, addedRules)
        return res.json({ redirect: `/admin/services/${serviceId}` })
    }

    async makeServiceInactive(req, res) {
        const serviceId = req.params.serviceId
        try {
            await adminService.deactivateService(serviceId)
            req.session.warningMessage = "Услуга теперь неактивна."
            return res.json({ redirect: `/admin/services/${serviceId}` })
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: `/admin/services/${serviceId}` })
        }   
    }

    async addRuleToService(req, res) {
        const serviceId = req.params.serviceId
        try {
            const rule = req.body.rule
            const savingRule = ruleConverter.fromJsonToRule(rule)
            await adminService.createRule(serviceId, savingRule)
            req.session.warningMessage = "Правило добавлено."
            return res.json({ redirect: `/admin/services/${serviceId}` })
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: `/admin/services/${serviceId}` })
        }
    }

    async editRule(req, res) {
        const serviceId = req.params.serviceId
        try {
            const rule = req.body.rule
            const ruleId = rule.ruleId
            const editingRule = ruleConverter.fromJsonToRule(rule)
            await adminService.updateRule(serviceId, ruleId, editingRule)
            req.session.warningMessage = "Правило обновлено."
            return res.json({ redirect: `/admin/services/${serviceId}` })
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: `/admin/services/${serviceId}` })
        }
    } 

    async deleteRule(req, res) {
        const serviceId = req.params.serviceId
        try {
            const ruleId = req.params.ruleId
            await adminService.deleteRule(serviceId, ruleId)
            req.session.warningMessage = "Правило удалено."
            return res.json({ redirect: `/admin/services/${serviceId}` })
        } catch (error) {
            req.session.errorMessage = error.message
            return res.json({ redirect: `/admin/services/${serviceId}` })
        }
    } 
}

module.exports = new AdminController()