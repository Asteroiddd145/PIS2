const civilServantService = require("../services/civilServant.service")

class CivilServant {
    async logIn(req, res) {
        const {login, password} = req.body
        
        const loginResult = await civilServantService.tryLogin(login, password)

        if (loginResult === loginStatus.NOT_FOUND) {
            return res.json("Ошибка! Не найден аккаунт.")
        }

        if (loginResult === loginStatus.WRONG_PASSWORD) {
            return res.json("Ошибка! Указан неверный пароль.")
        }

        if (loginResult === loginStatus.SUCCESS) {
            return res.json("Вход выполнен!")
        }
    }

    async getRequest(req, res) {
        
    }

    async changeRequestStatus(req, res) {
        
    }

    async attachResultToRequest(req, res) {
        
    }
}

module.exports = new CivilServant()