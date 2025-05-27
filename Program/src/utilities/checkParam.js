const parseValue = require("../utilities/parseValue")

function checkParam(user, p) {
    if (p.parameter == null) return true

    const val = user[p.parameter]
    switch (p.parameterOperator) {
        case "=":
            if (typeof val === "boolean") return val === (p.parameterValue === "true")
            return val == parseValue(p.parameterValue)
        case "!=":
            return val != parseValue(p.parameterValue)
        case ">":
            return Number(val) > parseValue(p.parameterValue)
        case "<":
            return Number(val) < parseValue(p.parameterValue)
        default:
            return false
    }
}


module.exports = checkParam