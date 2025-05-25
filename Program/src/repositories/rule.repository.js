const db = require("../../db")
const ruleConverter = require("../utilities/ruleConverter")

class RuleRepository {
    async findById(ruleId) {
        const result = await db.query(
            "SELECT * FROM rules WHERE rule_id = $1", 
            [ruleId]
        )

        const row = result.rows[0]
        if (row) {
            const rule = ruleConverter.fromDatabasetoRule(row)
            return rule
        }
        return null
    }
    
    async findAllByService(serviceId) {
        const result = await db.query(
            "SELECT * FROM rules WHERE service_id = $1",
            [serviceId]
        )

        const rows = result.rows
        if (rows.length > 0) {
            const list = rows.map(row => ruleConverter.fromDatabasetoRule(row))
            return list
        }
        return []
    }

    async save(rule, serviceId) {
        const result = await db.query(
            "INSERT INTO rules (service_id, description, period, parameter, logical_operator, parameter_value) VALUES ($1, $2, $3, $4, $5, $6) RETURNING rule_id",
            [serviceId, rule.description, rule.period, rule.parameter, rule.logicalOperator, rule.parameterValue]
        )
        return result.rows[0].rule_id
    }

    async update(ruleId, rule) {
        await db.query(
            "UPDATE rules SET description = $1, period = $2, parameter = $3, logical_operator = $4, parameter_value = $5 WHERE rule_id = $6",
            [rule.description, rule.period, rule.parameter, rule.logicalOperator, rule.parameterValue, ruleId]
        )
    }

    async delete(ruleId) {
        await db.query(
            "DELETE FROM rules WHERE rule_id = $1",
            [ruleId]
        )
    }
}

module.exports = new RuleRepository()