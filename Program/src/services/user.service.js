const requestStatus = require("../constants/requestStatus")
const userRepository = require("../repositories/user.repository")
const requestRepository = require("../repositories/request.repository")
const serviceRepository = require("../repositories/service.repository")
const ruleRepository = require("../repositories/rule.repository")
const Request = require("../models/request")
const Errors = require("../errors")

class UserService {
    async trySignUp(savedUser) {
        const user = await userRepository.findByLogin(savedUser.login)
        if (!user) {
            await userRepository.save(savedUser)
            return true
        } else {
            throw new Errors.LoginAlreadyExist()
        }
    }

    async tryLogin(login, password) {
        const user = await userRepository.findByLogin(login)
        if (user) {
            if (user.password === password) {
                const userFromAccount = await userRepository.findByAccountId(user.accountId) 
                return userFromAccount.userId
            } else {
                throw new Errors.AccountWrongPassword()
            }
        } else {
            throw new Errors.AccountNotExist()
        }
    }

    async getUser(userId) {
        const user = await userRepository.findById(userId)
        if (user) {
            return user
        } else {
            throw Errors.UserNotExist
        }
    }

    async updateUser(userId, newUser) {
        const user = await userRepository.findById(userId)
        if (user) {
            Object.keys(user).forEach(key => {
                if (newUser[key] !== user[key] && newUser[key] !== null && newUser[key] !== "" && newUser[key] !== undefined) {
                    user[key] = newUser[key]
                }
            })
            await userRepository.update(userId, user)
        } else {
            throw new Errors.UserNotExist()
        }
    }

    async getAllRequests(userId) {
        const list = await requestRepository.getAll()
        const userRequests = list.filter(request => request.userId === Number(userId))
        return userRequests
    }

    async getAllActiveServices() {
        const list = await serviceRepository.getAll()
        const activeServices = list.filter(service => service.endDateOfValidity === null)
        return activeServices
    }

    async getService(serviceId) {
        const service = await serviceRepository.findById(serviceId)
        if (service) {
            if (service.endDateOfValidity === null) {
                return service
            } else {
                throw new Errors.ServiceIsDeactive()
            }
        } else {
            throw new Errors.ServiceNotExist()
        }
    }

    async getServiceAndRules(serviceId) {
        const service = await serviceRepository.findById(serviceId)
        if (service) {
            if (service.endDateOfValidity === null) {
                const rules = await ruleRepository.findAllByService(serviceId)
                return {service, rules}
            } else {
                throw new Errors.ServiceIsDeactive()
            }
        } else {
            throw new Errors.ServiceNotExist()
        }
    }

    async getRequest(requestId) {
        const request = await requestRepository.findById(requestId)
        if (request) {
            return request
        } else {
            throw new Errors.RequestNotExist()
        }
    }

    async createRequest(userId, serviceId) {
        const service = await serviceRepository.findById(serviceId)
        if (service) {
            if (service.endDateOfValidity === null) {
                const plannedCompletionDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // ВЫСЧИТАТЬ!
                const request = new Request(null, userId, null, serviceId, requestStatus.WAITING, null, plannedCompletionDate, new Date())
                const requestId = await requestRepository.save(request)
                return await requestRepository.findById(requestId)
            } else {
                throw new Errors.ServiceIsDeactive()
            }
        } else {
            throw new Errors.ServiceNotExist()
        }
    }

    async cancelRequest(requestId) {
        const request = await requestRepository.findById(requestId)
        if (request) {
            if ([requestStatus.WAITING, requestStatus.IN_PROGRESS].includes(request.status)) {
                request.status = requestStatus.CANCELLED
                await requestRepository.update(requestId, request)
            } else {
                throw new Errors.RequestAlreadyBeingProcessed()
            }
        } else {
            throw new Errors.RequestNotExist()
        }
    }
}

module.exports = new UserService()