const db = require("../db")
const roles = require("../constants/roles")
const civilServantConverter = require("../utilities/civilServantConverter")

class CivilServantRepository {
    async findByLogin(login) {
        const result = await db.query(
            "SELECT * FROM accounts WHERE login = $1 AND role = $2", 
            [login, roles.CIVILSERVANT]
        )

        const row = result.rows[0]
        if (row) {
            const civilServant = civilServantConverter.fromDatabaseToCivilServant(row)
            return civilServant
        }
        return null
    }
}

module.exports = new CivilServantRepository()