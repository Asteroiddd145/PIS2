const db = require("../db")
const roles = require("../constants/roles")
const User = require("../models/user")

class UserRepository {
    async findByLogin(login) {
        const result = await db.query(
            "SELECT * FROM accounts WHERE login = $1 AND role = $2", 
            [login, roles.USER]
        )

        const row = result.rows[0]
        if (row) {
            const user = new User(row.account_id, row.login, row.password, row.role)
            return user
        }
        return null
    }

    async findById(userId) {
        const result = await db.query(
            "SELECT a.*, u.* FROM users u JOIN accounts a ON a.account_id = u.account_id WHERE u.user_id = $1", 
            [userId]
        )

        const row = result.rows[0]
        if (row) {
            const user = new User(row.account_id, row.login, row.password, row.role, row.first_name, row.patronymic, row.last_name, row.inn, row.passport_number, row.passport_series, row.date_of_birth, row.citizenship, row.email)
            return user
        }
        return null
    }

    async save(user) {
        const accountResult = await db.query(
            "INSERT INTO accounts (login, password, role) VALUES ($1, $2, $3) RETURNING account_id",
            [user.login, user.password, roles.USER]
        )
        const accountId = accountResult.rows[0].account_id
        const userResult = await db.query(
            "INSERT INTO users (account_id, first_name, patronymic, last_name, inn, passport_number, passport_series, date_of_birth, citizenship, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING user_id",
            [accountId, user.firstName, user.patronymic, user.lastName, user.inn, user.passportNumber, user.passportSeries, user.dateOfBirth, user.citizenship, user.email]
        )
        return userResult.rows[0].user_id
    }

    async update(userId, user) {
        await db.query(
            "UPDATE users SET first_name = $1, patronymic = $2, last_name = $3, inn = $4, passport_number = $5, passport_series = $6, date_of_birth = $7, citizenship = $8, email = $9 WHERE user_id = $10",
            [user.firstName, user.patronymic, user.lastName, user.inn, user.passportNumber, user.passportSeries, user.dateOfBirth, user.citizenship, user.email, userId]
        )
    }
}

module.exports = new UserRepository()