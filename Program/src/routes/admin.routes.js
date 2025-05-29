const Router = require("express")
const router = new Router()
const adminController = require("../controllers/admin.controller")

router.post("/login", adminController.logIn)
router.get("/services", adminController.getAllServices) 
router.post("/services", adminController.addService)
router.get("/services/:serviceId", adminController.getServiceAndRules)
router.patch("/services/:serviceId/inactive", adminController.makeServiceInactive)
router.post("/services/:serviceId", adminController.addRuleToService)
router.patch("/services/:serviceId/:ruleId", adminController.editRule)
router.delete("/services/:serviceId/:ruleId", adminController.deleteRule)

module.exports = router