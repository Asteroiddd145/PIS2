const Router = require("express")
const router = new Router()
const adminController = require("../controllers/admin.controller")

/* CHECK CORRECTNESS */
router.post("/admin/login", adminController.logIn)
router.post("/services", adminController.addService)
router.patch("/services/:serviceId/inactive", adminController.makeServiceInactive)
router.post("/services/:serviceId/rules", adminController.addRuleToService)
router.delete("/rules/:ruleId", adminController.deleteRule)
router.patch("/rules/:ruleId", adminController.editRule)

module.exports = router