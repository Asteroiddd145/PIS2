const Account = require("./account")

class User extends Account {
    constructor(accountId, login, password, role, userId, firstName, patronymic, lastName, inn, passportNumber, passportSeries, dateOfBirth, citizenship, email) {
        super(accountId, login, password, role)
        
        this.userId = userId
        this.firstName = firstName
        this.patronymic = patronymic
        this.lastName = lastName
        this.inn = inn
        this.passportNumber = passportNumber
        this.passportSeries = passportSeries
        this.dateOfBirth = dateOfBirth
        this.citizenship = citizenship
        this.email = email
    }
}

module.exports = User