const loginStatus = require("../constants/loginStatus")
const requestStatus = require("../constants/requestStatus")

const userRepository = require("../repositories/user.repository")
const requestRepository = require("../repositories/request.repository")
const serviceRepository = require("../repositories/service.repository")
const ruleRepository = require("../repositories/rule.repository")

const User = require("../models/user")
const Request = require("../models/request")
const Service = require("../models/service")
const Rule = require("../models/rule")

class UserService {
    async trySignUp(user) {
        return new User()
    }

    async tryLogin(login, password) {
        return loginStatus.NOT_FOUND
    }

    async updateUser(userId, user) {
        return new User()
    }

    async getAllRequests(userId) {
        return [
            new Request(),
            new Request(),
            new Request()
        ]
    }

    async getAllActiveServices() {
        return [
            new Service(),
            new Service(),
            new Service()
        ]
    }

    async getRulesForService(serviceId) {
        return [
            new Rule(),
            new Rule(),
            new Rule()
        ]
    }

    async createRequest(userId, serviceId) {
        return new Request()
    }

    async cancelRequest(requestId) {
        
    }

    async getRequestStatus(requestId) {
        return requestStatus.IN_PROGRESS
    }

    async getRequestResult(requestId) {
        return ""
    }
}

module.exports = new UserService()