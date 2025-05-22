const loginStatus = require("../constants/loginStatus")

const adminRepository = require("../repositories/admin.repository")
const serviceRepository = require("../repositories/service.repository")
const ruleRepository = require("../repositories/rule.repository")

class AdminService {
    async tryLogin(login, password) {
        const admin = await adminRepository.findByLogin(login)

        if (!admin) {
            return loginStatus.NOT_FOUND
        }

        if (admin.password !== password) {
            return loginStatus.WRONG_PASSWORD
        }

        if (admin.password === password) {
            return loginStatus.SUCCESS
        }
    }

    async getService(serviceId) {
        const service = await serviceRepository.findById(serviceId)
        return service
    }

    async getServiceAndRules(serviceId) {
        const service = await serviceRepository.findById(serviceId)
        const rules = await ruleRepository.findAllByService(serviceId)
        return {service, rules}
    }
    
    async getAllServices() {
        const list = await serviceRepository.getAll()
        return list
    }

    async getRulesForService(serviceId) {
        const rules = await ruleRepository.findByService(serviceId)
        return rules
    }

    async createService(service, rules) {
        const serviceId = await serviceRepository.save(service)

        if (rules.length > 0) {
            const existedRules = await ruleRepository.findAllByService(serviceId)

            rules.map(rule => {
                if (existedRules.length === 0 || existedRules.contains(rule)) {
                    ruleRepository.save(rule, serviceId)
                }
            })
        }

        const createdService = await serviceRepository.findById(serviceId)
        return createdService
    }

    async deactivateService(serviceId) {
        const service = await serviceRepository.findById(serviceId)
        service.endDateOfValidity = new Date()
        await serviceRepository.update(serviceId, service)
    }

    async createRule(serviceId, rule) {
        const ruleId = await ruleRepository.save(rule, serviceId)
        const createdRule = await ruleRepository.findById(ruleId)
        return createdRule
    }

    async updateRule(ruleId, rule) {
        await ruleRepository.update(ruleId, rule)
        const updatedRule = await ruleRepository.findById(ruleId)
        return updatedRule
    }

    async deleteRule(ruleId) {
        await ruleRepository.delete(ruleId)
    }
}

module.exports = new AdminService()