const db = require("../db")
const roles = require("../constants/roles")
const accountConverter = require("../utilities/accountConverter")

class CivilServantRepository {
    async findByLogin(login) {
        const result = await db.query(
            "SELECT * FROM accounts WHERE login = $1 AND role = $2", 
            [login, roles.CIVILSERVANT]
        )

        const row = result.rows[0]
        if (row) {
            const account = accountConverter.fromDatabaseToAccount(row)
            const civilServant = accountConverter.fromAccountToCivilServant(account)
            return civilServant
        }
        return null
    }
}

module.exports = new CivilServantRepository()