const Router = require("express")
const router = new Router()
const civilServantController = require("../controllers/civilServant.controller")

router.post("/login", civilServantController.logIn)
router.get("/:id/requests", civilServantController.getAllRequests)
router.patch("/:id/requests/:requestId", civilServantController.processRequest)
router.get("/:id/requests/:requestId", civilServantController.getRequest)
router.patch("/:id/requests/:requestId/status", civilServantController.changeRequestStatus)
router.patch("/:id/requests/:requestId/result", civilServantController.attachResultToRequest)

module.exports = router