const db = require("../db")
const serviceConverter = require("../utilities/serviceConverter")

class ServiceRepository {
    async getAll() {
        const result = await db.query(
            "SELECT * FROM services"
        )

        const rows = result.rows
        const list = rows.map(row => serviceConverter.fromDatabasetoService(row))
        return list
    }

    async findById(serviceId) {
        const result = await db.query(
            "SELECT * FROM services WHERE service_id = $1", 
            [serviceId]
        )

        const row = result.rows[0]
        if (row) {
            const service = serviceConverter.fromDatabasetoService(row)
            return service
        }
        return null
    }

    async save(service) {
        const result = await db.query(
            "INSERT INTO services (name, result_description, service_description, start_date_of_validity, end_date_of_validity) VALUES ($1, $2, $3, $4, $5) RETURNING service_id",
            [service.name, service.resultDescription, service.serviceDescription, service.startDateOfValidity, service.endDateOfValidity]
        )
        return result.rows[0].service_id
    }

    async update(serviceId, service) {
        await db.query(
            "UPDATE services SET name = $1, result_description = $2, service_description = $3, start_date_of_validity = $4, end_date_of_validity = $5 WHERE service_id = $6", 
            [service.name, service.resultDescription, service.serviceDescription, service.startDateOfValidity, service.endDateOfValidity, serviceId]
        )
    }
}

module.exports = new ServiceRepository()