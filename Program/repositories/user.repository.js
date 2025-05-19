const db = require("../db")
const roles = require("../constants/roles")
const User = require("../model/user")

class UserRepository {
    async findByLogin(login) {
        return new User()
    }

    async findById(userId) {
        return new User()
    }

    async save(user) {
        return -1
    }

    async update(userId, user) {

    }
}

module.exports = new UserRepository()