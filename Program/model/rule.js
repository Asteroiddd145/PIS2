class Rule {
    constructor(service, description, period, parameter, logicalOperator, parameterValue) {
        this.service = service
        this.description = description
        this.period = period
        this.parameter = parameter
        this.logicalOperator = logicalOperator
        this.parameterValue = parameterValue
    }
}

module.exports = Rule