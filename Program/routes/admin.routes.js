const Router = require("express")
const router = new Router()
const adminController = require("../controllers/admin.controller")

router.post("/admin/login", adminController.logIn)
router.get("/admin/services", adminController.getAllServices) 
router.post("/admin/services", adminController.addService)
router.get("/admin/services/:id", adminController.getService)
router.patch("/admin/services/:id/inactive", adminController.makeServiceInactive)
router.get("/admin/services/:id/rules", adminController.getServiceAndRules)
router.post("/admin/services/:id/rules", adminController.addRuleToService)
router.patch("/admin/services/:serviceId/rules/:ruleId", adminController.editRule)
router.delete("/admin/services/:serviceId/rules/:ruleId", adminController.deleteRule)

module.exports = router