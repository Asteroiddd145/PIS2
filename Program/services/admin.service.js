const loginStatus = require("../constants/loginStatus")

const adminRepository = require("../repositories/admin.repository")
const serviceRepository = require("../repositories/service.repository")
const ruleRepository = require("../repositories/rule.repository")

const Service = require("../models/service")
const Rule = require("../models/rule")

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
    
    async getAllServices() {
        return [
            new Service(),
            new Service(),
            new Service()
        ]
    }

    async getRulesForService(serviceId) {
        return [
            new Rule(),
            new Rule(),
            new Rule()
        ]
    }

    async createService(service, rules) {
        return new Service()
    }

    async deactivateService(serviceId) {

    }

    async createRule(serviceId, rule) {
        return new Rule()
    }

    async updateRule(ruleId, rule) {
        return new Rule()
    }

    async deleteRule(ruleId) {
        
    }
}

module.exports = new AdminService()