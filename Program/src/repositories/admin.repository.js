const db = require("../../db")
const roles = require("../constants/roles")
const accountConverter = require("../utilities/accountConverter")

class AdminRepository {
    async findByLogin(login) {
        const result = await db.query(
            "SELECT * FROM accounts WHERE login = $1 AND role = $2", 
            [login, roles.ADMIN]
        )

        const row = result.rows[0]
        if (row) {
            const account = accountConverter.fromDatabaseToAccount(row)
            const admin = accountConverter.fromAccountToAdmin(account)
            return admin
        }
        return null
    }
}

module.exports = new AdminRepository()