class Parameter {
    constructor(parameterId, ruleId, groupNumber, groupOperator, parameter, parameterOperator, parameterValue) {
        this.parameterId = parameterId
        this.ruleId = ruleId
        this.groupNumber = groupNumber
        this.groupOperator = groupOperator
        this.parameter = parameter
        this.parameterOperator = parameterOperator
        this.parameterValue = parameterValue
    }
}

module.exports = Parameter