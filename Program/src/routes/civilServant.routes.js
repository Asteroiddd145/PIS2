const Router = require("express")
const router = new Router()
const civilServantController = require("../controllers/civilServant.controller")

router.post("/login", civilServantController.logIn)
router.get("/requests", civilServantController.getAllRequests)
router.patch("/requests/:requestId", civilServantController.processRequest)
router.get("/requests/:requestId", civilServantController.getRequest)
router.patch("/requests/:requestId/status", civilServantController.changeRequestStatus)
router.patch("/requests/:requestId/result", civilServantController.attachResultToRequest)

module.exports = router