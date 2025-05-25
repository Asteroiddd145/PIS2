class AccountNotExist extends Error {
    constructor() {
        super("Аккаунт не существует.")
        this.name = "AccountNotExistError"
        this.status = 400
    }
}

class AccountWrongPassword extends Error {
    constructor() {
        super("Неверный пароль.")
        this.name = "WrongPasswordError"
        this.status = 400
    }
}

class ServiceNotExist extends Error {
    constructor() {
        super("Услуга не существует.")
        this.name = "ServiceNotExistError"
        this.status = 400
    }
}

class ServiceIsDeactive extends Error {
    constructor() {
        super("Услуга не активна.")
        this.name = "ServiceIsDeactiveError"
        this.status = 400
    }
}

class RuleNotExist extends Error {
    constructor() {
        super("Правило не существует.")
        this.name = "RuleNotExistError"
        this.status = 400
    }
}

class RuleAlreadyExist extends Error {
    constructor() {
        super("Такое правило уже существует.")
        this.name = "RuleAlreadyExistError"
        this.status = 400
    }
}

class RequestNotExist extends Error {
    constructor() {
        super("Заявки не существует.")
        this.name = "RequestNotExistError"
        this.status = 400
    }
}

class RequestNotAvailable extends Error {
    constructor() {
        super("Заявка не доступна.")
        this.name = "RequestNotAvailableError"
        this.status = 400
    }
}

class RequestAlreadyBeingProcessed extends Error {
    constructor() {
        super("Заявка не доступна.")
        this.name = "RequestIsNotAvailableError"
        this.status = 400
    }
}

class LoginAlreadyExist extends Error {
    constructor() {
        super("Логин уже существует.")
        this.name = "LoginAlreadyExistError"
        this.status = 400
    }
}

class UserNotExist extends Error {
    constructor() {
        super("Пользователя не существует.")
        this.name = "UserNotExistError"
        this.status = 400
    }
}

function matchAndRespondError(error, req, ...errorClasses) {
    for (const errorClass of errorClasses) {
        if (error instanceof errorClass) {
            req.session.errorMessage = error.message
            //return res.status(error.status || 400).json({ error: error.message })
        }
    }

    req.session.errorMessage = "Неизвестная ошибка сервера."
    /*return res.status(500).json({
        error: {
            title: "Неизвестная ошибка сервера.",
            message: error.message,
            name: error.name
        }
    })*/
}


module.exports = {
    AccountNotExist,
    AccountWrongPassword,
    ServiceNotExist,
    ServiceIsDeactive,
    RuleNotExist,
    RuleAlreadyExist,
    RequestNotExist,
    RequestNotAvailable,
    RequestAlreadyBeingProcessed,
    LoginAlreadyExist,
    UserNotExist,
    matchAndRespondError
}