class Service {
    constructor(serviceId, name, resultDescription, serviceDescription, startDateOfValidity, endDateOfValidity) {
        this.serviceId = serviceId
        this.name = name
        this.resultDescription = resultDescription
        this.serviceDescription = serviceDescription
        this.startDateOfValidity = startDateOfValidity
        this.endDateOfValidity = endDateOfValidity
    }
}

module.exports = Service