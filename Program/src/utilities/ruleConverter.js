const Rule = require("../models/rule")
const Parameter = require("../models/parameter")

function fromJsonToRule(data) {
    return new Rule(data.ruleId, data.serviceId, data.description, data.period)
}

function fromDatabasetoRule(data) {
    return new Rule(data.rule_id, data.service_id, data.description, data.period)
}

function fromJsonToParameter(data) {
    return new Parameter(data.parameterId, data.ruleId, data.groupNumber, data.groupOperator, data.parameter, data.parameterOperator, data.parameterValue)
}

function fromDatabasetoParameter(data) {
    return new Parameter(data.parameter_id, data.rule_id, data.group_number, data.group_operator, data.parameter, data.logical_operator, data.parameter_value)
}

module.exports = { fromJsonToRule, fromDatabasetoRule, fromJsonToParameter, fromDatabasetoParameter}