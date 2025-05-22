const db = require("../db")
const roles = require("../constants/roles")
const adminConverter = require("../utilities/adminConverter")

class AdminRepository {
    async findByLogin(login) {
        const result = await db.query(
            "SELECT * FROM accounts WHERE login = $1 AND role = $2", 
            [login, roles.ADMIN]
        )

        const row = result.rows[0]
        if (row) {
            const admin = adminConverter.fromDatabaseToAdmin(row)
            return admin
        }
        return null
    }
}

module.exports = new AdminRepository()