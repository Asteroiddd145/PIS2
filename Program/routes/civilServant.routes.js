const Router = require("express")
const router = new Router()
const civilServantController = require("../controllers/civilServant.controller")

router.post("/civilservant/login", civilServantController.logIn)
router.get("/civilservant/:id/requests", civilServantController.getAllRequests)
router.patch("/civilservant/:id/requests/:requestId", civilServantController.processRequest)
router.get("/civilservant/:id/requests/:requestId", civilServantController.getRequest)
router.patch("/civilservant/:id/requests/:requestId/status", civilServantController.changeRequestStatus)
router.patch("/civilservant/:id/requests/:requestId/result", civilServantController.attachResultToRequest)

module.exports = router