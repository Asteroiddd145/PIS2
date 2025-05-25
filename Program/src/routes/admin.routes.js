const Router = require("express")
const router = new Router()
const adminController = require("../controllers/admin.controller")

router.post("/login", adminController.logIn)
router.get("/:id/services", adminController.getAllServices) 
router.post("/:id/services", adminController.addService)
router.get("/:id/services/:serviceId", adminController.getService)
router.patch("/:id/services/:serviceId/inactive", adminController.makeServiceInactive)
router.get("/:id/services/:serviceId/rules", adminController.getServiceAndRules)
router.post("/:id/services/:serviceId/rules", adminController.addRuleToService)
router.patch("/:id/services/:serviceId/rules/:ruleId", adminController.editRule)
router.delete("/:id/services/:serviceId/rules/:ruleId", adminController.deleteRule)

module.exports = router