const db = require("../../db")
const ruleConverter = require("../utilities/ruleConverter")

class RuleRepository {
    async findById(ruleId) {
        const result = await db.query(
            "SELECT r.*, p.* FROM rules r LEFT JOIN parameters p ON r.rule_id = p.rule_id WHERE r.rule_id = $1",
            [ruleId]
        )

        const row = result.rows[0]
        if (row) {
            const parameters = []
            for (const r of result.rows) {
                parameters.push(ruleConverter.fromDatabasetoParameter(r))
            }
            const rule = ruleConverter.fromDatabasetoRule(row)
            rule.parameters = parameters
            return rule
        }
        return null
    }
    
    async findAllByService(serviceId) {
        const result = await db.query(
            "SELECT r.*, p.* FROM rules r LEFT JOIN parameters p ON r.rule_id = p.rule_id WHERE r.service_id = $1 ORDER BY r.rule_id, p.group_number",
            [serviceId]
        )

        const rows = result.rows
        if (rows.length > 0) {
            const rules = []
            let currentRuleId = null
            let currentRule = null

            for (const row of result.rows) {
                if (row.rule_id !== currentRuleId) {
                    if (currentRule) {
                        rules.push(currentRule)
                    }
                    currentRuleId = row.rule_id
                    currentRule = ruleConverter.fromDatabasetoRule(row)
                    currentRule.parameters = []
                }
                currentRule.parameters.push(ruleConverter.fromDatabasetoParameter(row))
            }
            if (currentRule) {
                rules.push(currentRule)
            }
            return rules
        }
        return []
    }

    async save(rule, serviceId) {
        const result = await db.query(
            "INSERT INTO rules (service_id, description, period) VALUES ($1, $2, $3) RETURNING rule_id",
            [serviceId, rule.description, rule.period]
        )
        const ruleId = result.rows[0].rule_id

        if (rule.parameters.length > 0) {
            for (const param of rule.parameters) {
                await db.query(
                    "INSERT INTO parameters (rule_id, group_number, group_operator, parameter, logical_operator, parameter_value) VALUES ($1, $2, $3, $4, $5, $6)",
                    [ruleId, param.groupNumber, param.groupOperator, param.parameter, param.parameterOperator, param.parameterValue]
                )
            }
        }
        return ruleId
    }

    async update(ruleId, rule) {
        await db.query(
            "UPDATE rules SET description = $1, period = $2 WHERE rule_id = $3",
            [rule.description, rule.period, ruleId]
        )

        await db.query("DELETE FROM parameters WHERE rule_id = $1", [ruleId])

        if (rule.parameters.length > 0) {
            for (const param of rule.parameters) {
                await db.query(
                    `INSERT INTO parameters (rule_id, group_number, group_operator, parameter, logical_operator, parameter_value)
                    VALUES ($1, $2, $3, $4, $5, $6)`,
                    [ruleId, param.groupNumber, param.groupOperator, param.parameter, param.parameterOperator, param.parameterValue]
                )
            }
        }
    }

    async delete(ruleId) {
        await db.query("DELETE FROM parameters WHERE rule_id = $1", [ruleId])
        await db.query("DELETE FROM rules WHERE rule_id = $1", [ruleId])
    }
}

module.exports = new RuleRepository()