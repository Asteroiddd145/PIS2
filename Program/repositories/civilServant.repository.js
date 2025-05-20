const db = require("../db")
const roles = require("../constants/roles")
const CivilServant = require("../models/civilServant")

class CivilServantRepository {
    async findByLogin(login) {
        const result = await db.query(
            "SELECT * FROM accounts WHERE login = $1 AND role = $2", 
            [login, roles.CIVILSERVANT]
        )

        const row = result.rows[0]
        if (row) {
            const civilServant = new CivilServant(row.account_id, row.login, row.password, row.role)
            return civilServant
        }
        return null
    }
}

module.exports = new CivilServantRepository()