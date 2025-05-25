class Rule {
    constructor(ruleId, serviceId, description, period, parameter, logicalOperator, parameterValue) {
        this.ruleId = ruleId
        this.serviceId = serviceId
        this.description = description
        this.period = period
        this.parameter = parameter
        this.logicalOperator = logicalOperator
        this.parameterValue = parameterValue
    }
}

module.exports = Rule