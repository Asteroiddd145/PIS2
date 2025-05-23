const Router = require("express")
const router = new Router()
const civilServantController = require("../controllers/civilServant.controller")

router.post("/civilServant/login", civilServantController.logIn)
router.get("/civilServant/requests", civilServantController.getAllRequests)
router.get("/civilServant/requests/:id", civilServantController.getRequest)
router.patch("/civilServant/requests/:id/status", civilServantController.changeRequestStatus)
router.patch("/civilServant/requests/:id/result", civilServantController.attachResultToRequest)

module.exports = router