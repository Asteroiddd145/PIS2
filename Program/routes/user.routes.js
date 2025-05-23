const Router = require("express")
const router = new Router()
const userController = require("../controllers/user.controller")

router.post("/user/signup", userController.signUp)
router.post("/user/login", userController.logIn)
router.get("/user/:id/profile", userController.getUserProfile)
router.patch("/user/:id/profile", userController.applyUserChanges)
router.get("/user/:id/requests", userController.getRequests)
router.get("/user/:id/requests/:requestId", userController.getRequest)
router.get("/user/:id/services", userController.getServices)
router.get("/user/:id/services/:serviceId", userController.getService)
router.get("/user/:id/services/:serviceId/rules", userController.getServiceAndRules)
router.post("/user/:id/requests/service/:serviceId", userController.submitRequest)
router.patch("/user/:id/requests/:requestId", userController.cancelRequest)

module.exports = router