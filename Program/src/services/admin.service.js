const adminRepository = require("../repositories/admin.repository")
const serviceRepository = require("../repositories/service.repository")
const ruleRepository = require("../repositories/rule.repository")
const Errors = require("../errors")
const areParamsEqual = require("../utilities/areParamsEqual")

class AdminService {
    async tryLogin(login, password) {
        const admin = await adminRepository.findByLogin(login)
        if (admin) {
            if (admin.password === password) {
                return admin.accountId
            } else {
                throw new Errors.AccountWrongPassword()
            }
        } else {
            throw new Errors.AccountNotExist()
        }
    }

    async getService(serviceId) {
        const service = await serviceRepository.findById(serviceId)
        if (service) {
            if (service.endDateOfValidity === null) {
                return service
            } else {
                throw new Errors.ServiceIsDeactive()
            }
        } else {
            throw new Errors.ServiceNotExist()
        }
    }

    async getServiceAndRules(serviceId) {
        const service = await serviceRepository.findById(serviceId)
        if (service) {
            const rules = await ruleRepository.findAllByService(serviceId)
            return {service, rules}
        } else {
            throw new Errors.ServiceNotExist()
        }
    }
    
    async getAllServices() {
        const list = await serviceRepository.getAll()
        return list
    }

    async getRulesForService(serviceId) {
        const rules = await ruleRepository.findAllByService(serviceId)
        return rules
    }

    async createService(service, rules) {
        const createdService = service
        createdService.startDateOfValidity = new Date()  
        const serviceId = await serviceRepository.save(createdService)
        if (rules.length > 0) {
            const existedRules = await ruleRepository.findAllByService(serviceId)
            for (const rule of rules) {
                const isDuplicate = existedRules.some(existingRule => {
                    return (
                    existingRule.description === rule.description &&
                    existingRule.period === rule.period &&
                    areParamsEqual(existingRule.parameters, rule.parameters)
                    )
                })
                if (!isDuplicate) {
                    await ruleRepository.save(rule, serviceId)
                }
            }
        }
        return serviceId
    }

    async deactivateService(serviceId) {
        const service = await serviceRepository.findById(serviceId)
        if (service) {
            if (service.endDateOfValidity === null) {
                service.name += " (неактивна)"
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

    async updateRule(serviceId, ruleId, rule) {
        const service = await serviceRepository.findById(serviceId)
        if (service) {
            if (service.endDateOfValidity === null) {
                const editingRule = await ruleRepository.findById(ruleId)
                if (editingRule) {
                    await ruleRepository.update(ruleId, rule)
                } else {
                    throw new Errors.RuleNotExist()
                }
            } else {
                throw new Errors.ServiceIsDeactive()
            }
        } else {
            throw new Errors.ServiceNotExist()
        }
    }

    async deleteRule(serviceId, ruleId) {
        const service = await serviceRepository.findById(serviceId)
        if (service) {
            if (service.endDateOfValidity === null) {
                const editingRule = await ruleRepository.findById(ruleId)
                if (editingRule) {
                    await ruleRepository.delete(ruleId)
                } else {
                    throw new Errors.RuleNotExist()
                }
            } else {
                throw new Errors.ServiceIsDeactive()
            }
        } else {
            throw new Errors.ServiceNotExist()
        }
    }
}

module.exports = new AdminService()