const db = require("../db")
const Service = require("../model/service")

class ServiceRepository {
    async getAll() {
        return [
            new Service(),
            new Service(),
            new Service()
        ]
    }

    async findById(serviceId) {
        return new Service()
    }

    async save(service) {
        return -1
    }

    async update(serviceId, service) {
        
    }
}

module.exports = new ServiceRepository()