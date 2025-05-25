const Rule = require("../models/rule")

function fromJsonToRule(data) {
    return new Rule(data.ruleId, data.serviceId, data.description, data.period, data.parameter, data.logicalOperator, data.parameterValue)
}

function fromDatabasetoRule(data) {
    return new Rule(data.rule_id, data.service_id, data.description, data.period, data.parameter, data.logical_operator, data.parameter_value)
}

module.exports = { fromJsonToRule, fromDatabasetoRule }