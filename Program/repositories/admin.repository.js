const db = require("../db")
const roles = require("../constants/roles")
const Admin = require("../model/admin")

class AdminRepository {
    async findByLogin(login) {
        const result = await db.query(
            "SELECT login, password FROM accounts WHERE login = $1 AND role = $2", 
            [login, roles.ADMIN]
        )

        const row = result.rows[0]
        if (!row) return null

        const admin = new Admin(row.account_id, row.login, row.password, row.role)
        return admin
    }
}

module.exports = new AdminRepository()