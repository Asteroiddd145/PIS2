class Rule {
    constructor(ruleId, serviceId, description, period, parameters) {
        this.ruleId = ruleId
        this.serviceId = serviceId
        this.description = description
        this.period = period
        this.parameters = parameters
    }
}

module.exports = Rule