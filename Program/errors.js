class AccountNotExist extends Error {
    constructor() {
        super("Аккаунт не существует")
        this.name = "AccountNotExistError"
        this.status = 400
    }
}

class AccountWrongPassword extends Error {
    constructor() {
        super("Неверный пароль")
        this.name = "WrongPasswordError"
        this.status = 400
    }
}

class ServiceNotExist extends Error {
    constructor() {
        super("Услуга не существует")
        this.name = "ServiceNotExistError"
        this.status = 400
    }
}

class ServiceIsDeactive extends Error {
    constructor() {
        super("Услуга не активна")
        this.name = "ServiceIsDeactiveError"
        this.status = 400
    }
}

class RuleNotExist extends Error {
    constructor() {
        super("Правило не существует")
        this.name = "RuleNotExistError"
        this.status = 400
    }
}

class RuleAlreadyExist extends Error {
    constructor() {
        super("Такое правило уже существует")
        this.name = "RuleAlreadyExistError"
        this.status = 400
    }
}

function matchAndRespondError(error, res, ...errorClasses) {
    for (const errorClass of errorClasses) {
        if (error instanceof errorClass) {
            return res.status(error.status).json({ error: error.message })
        }
    }

    return res.status(500).json({ error: "Неизвестная ошибка сервера" })
}


module.exports = {
    AccountNotExist,
    AccountWrongPassword,
    ServiceNotExist,
    ServiceIsDeactive,
    RuleNotExist,
    RuleAlreadyExist,
    matchAndRespondError
}