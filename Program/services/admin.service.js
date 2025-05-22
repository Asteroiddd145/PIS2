const adminRepository = require("../repositories/admin.repository")
const serviceRepository = require("../repositories/service.repository")
const ruleRepository = require("../repositories/rule.repository")
const Errors = require("../errors")

class AdminService {
    async tryLogin(login, password) {
        const admin = await adminRepository.findByLogin(login)

        if (admin) {
            if (admin.password === password) {
                return true
            } else {
                throw new Errors.AccountWrongPassword()
            }
        } else {
            throw new Errors.AccountNotExist()
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

            for (const rule of rules) {
                const isDuplicate = existedRules.some(existing =>
                    existing.description === rule.description &&
                    existing.period === rule.period &&
                    existing.parameter === rule.parameter &&
                    existing.logicalOperator === rule.logicalOperator &&
                    existing.parameterValue === rule.parameterValue
                )

                if (!isDuplicate) {
                    await ruleRepository.save(rule, serviceId)
                }
            }
        }

        const createdService = await serviceRepository.findById(serviceId)
        return createdService
    }

    async deactivateService(serviceId) {
        const service = await serviceRepository.findById(serviceId)

        if (service) {
            if (service.endDateOfValidity === null) {
                service.endDateOfValidity = new Date()
                await serviceRepository.update(serviceId, service)
                return service
            } else {
                throw new Errors.ServiceIsDeactive()
            }
        } else {
            throw new Errors.ServiceNotExist()
        }
    }

    async createRule(serviceId, rule) {
        const service = await serviceRepository.findById(serviceId)

        if (service) {
            if (service.endDateOfValidity === null) {
                const existedRules = await ruleRepository.findAllByService(serviceId)

                const isDuplicate = existedRules.some(existing => existing.description === rule.description && existing.period === rule.period && existing.parameter === rule.parameter && existing.logicalOperator === rule.logicalOperator && existing.parameterValue === rule.parameterValue)
                if (!isDuplicate) {
                    const ruleId = await ruleRepository.save(rule, serviceId)
                    const createdRule = await ruleRepository.findById(ruleId)
                    return createdRule
                } else {
                    throw new Errors.RuleAlreadyExist()
                }                
            } else {
                throw new Errors.ServiceIsDeactive()
            }
        } else {
            throw new Errors.ServiceNotExist()
        }
    }

    async updateRule(ruleId, rule) {
        const editingRule = await ruleRepository.findById(ruleId)

        if (editingRule) {
            await ruleRepository.update(ruleId, rule)
        } else {
            throw new Errors.RuleNotExist()
        }
    }

    async deleteRule(ruleId) {
        const editingRule = await ruleRepository.findById(ruleId)

        if (editingRule) {
            await ruleRepository.delete(ruleId)
        } else {
            throw new Errors.RuleNotExist()
        }
    }
}

module.exports = new AdminService()