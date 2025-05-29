const Rule = require("../models/rule")
const Parameter = require("../models/parameter")

function fromJsonToRule(data) {
    const ruleId = data.ruleId

    const parameters = Array.isArray(data.parameters)
        ? data.parameters.map(p => {
            if (!p.ruleId) p.ruleId = ruleId
            return fromJsonToParameter(p)
        })
        : []

    return new Rule(ruleId, data.serviceId, data.description, data.period, parameters)
}

function fromDatabasetoRule(data) {
    const ruleId = data.rule_id

    const parameters = Array.isArray(data.parameters)
        ? data.parameters.map(p => {
            if (!p.rule_id) p.rule_id = ruleId
            return fromDatabasetoParameter(p)
        })
        : []

    return new Rule(ruleId, data.service_id, data.description, data.period, parameters)
}

function fromJsonToParameter(data) {
    return new Parameter(data.parameterId, data.ruleId, data.groupNumber, data.groupOperator, data.parameter, data.parameterOperator, data.parameterValue)
}

function fromDatabasetoParameter(data) {
    return new Parameter(data.parameter_id, data.rule_id, data.group_number, data.group_operator, data.parameter, data.logical_operator, data.parameter_value)
}

module.exports = { fromJsonToRule, fromDatabasetoRule, fromJsonToParameter, fromDatabasetoParameter}