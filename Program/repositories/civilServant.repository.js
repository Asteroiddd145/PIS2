const db = require("../db")
const roles = require("../constants/roles")
const CivilServant = require("../model/civilServant")

class CivilServantRepository {
    async findByLogin(login) {
        return new CivilServant()
    }
}

module.exports = new CivilServantRepository()