const requestStatus = require("../constants/requestStatus")
const userRepository = require("../repositories/user.repository")
const requestRepository = require("../repositories/request.repository")
const serviceRepository = require("../repositories/service.repository")
const ruleRepository = require("../repositories/rule.repository")
const checkParam = require("../utilities/checkParam")
const Request = require("../models/request")
const Errors = require("../errors")

class UserService {
    async trySignUp(user) {
        const checkingUser = await userRepository.findByLogin(user.login)
        if (!checkingUser) {
            await userRepository.save(user)
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
        const allRequests = await requestRepository.getAll()
        const allServices = await serviceRepository.getAll()

        const userRequests = allRequests
            .filter(request => request.userId === Number(userId))
            .map(request => {
            const service = allServices.find(s => s.serviceId === request.serviceId)
            return { request, service }
            })

        return userRequests
    }

    async getAllActiveServices() {
        const list = await serviceRepository.getAll()
        const activeServices = list.filter(service => service.endDateOfValidity === null)
        return activeServices
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
                const user = await userRepository.findById(userId)
                if (user) {
                    if (user.dateOfEntry) {
                        const rules = await ruleRepository.findAllByService(serviceId)
                        const now = Date.now()

                        if (rules.length === 0) {
                            const request = new Request(null, userId, null, serviceId, requestStatus.WAITING, null, new Date(now + 3 * 24 * 60 * 60 * 1000), new Date())
                            await requestRepository.save(request)
                        }

                        let emptyRule = null
                        let validRule = null
                        for (const rule of rules) {
                            const isEmpty = rule.parameters.length === 0 || rule.parameters.every(param => param.parameter === null)

                            const groups = rule.parameters.reduce((result, param) => {
                                const groupN = param.groupNumber
                                result[groupN] = (result[groupN] || []).concat(param)
                                return result
                            }, {})

                            const passes = Object.entries(groups).every(([_, group]) => {
                                const operator = group[0].groupOperator
                                return operator === "AND" ? 
                                    group.every(param => checkParam(user, param)) :
                                    group.some(param => checkParam(user, param))
                            })

                            if (passes) {
                                if (isEmpty) emptyRule = rule
                                else validRule = rule
                            }
                        }

                        const chosenRule = validRule ? validRule : emptyRule
                        if (chosenRule) {
                            if (now - user.dateOfEntry.getTime() <= chosenRule.period * 24 * 60 * 60 * 1000) {
                                const base = user.dateOfEntry ? user.dateOfEntry.getTime() : now
                                const date = new Date(Math.max(now, base + chosenRule.period * 24 * 60 * 60 * 1000))
                                const request = new Request(null, userId, null, serviceId, requestStatus.WAITING, null, date, new Date())
                                await requestRepository.save(request)
                            } else {
                                throw new Errors.RequestPeriodHasExpired()
                            }
                        } else {
                            throw new Errors.UserDoesNotMeetRules()
                        }
                    } else {
                        throw new Errors.DateOfEntryIsNotSpecified()
                    }
                } else {
                    throw new Errors.UserNotExist()
                }
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