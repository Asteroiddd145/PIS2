const db = require("../db")
const Rule = require("../model/rule")

class RuleRepository {
    async findById(ruleId) {
        return new Rule()
    }
    
    async findByService(serviceId) {
        return [
            new Rule(),
            new Rule(),
            new Rule()
        ]
    }

    async save(rule, serviceId) {
        return -1
    }

    async update(ruleId, rule) {
        return -1
    }

    async delete(ruleId) {
        
    }
}

module.exports = new RuleRepository()