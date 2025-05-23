const Router = require("express")
const router = new Router()
const adminController = require("../controllers/admin.controller")

router.post("/admin/login", adminController.logIn)
router.get("/admin/:id/services", adminController.getAllServices) 
router.post("/admin/:id/services", adminController.addService)
router.get("/admin/:id/services/:serviceId", adminController.getService)
router.patch("/admin/:id/services/:serviceId/inactive", adminController.makeServiceInactive)
router.get("/admin/:id/services/:serviceId/rules", adminController.getServiceAndRules)
router.post("/admin/:id/services/:serviceId/rules", adminController.addRuleToService)
router.patch("/admin/:id/services/:serviceId/rules/:ruleId", adminController.editRule)
router.delete("/admin/:id/services/:serviceId/rules/:ruleId", adminController.deleteRule)

module.exports = router