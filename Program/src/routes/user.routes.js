const Router = require("express")
const router = new Router()
const userController = require("../controllers/user.controller")

router.post("/signup", userController.signUp)
router.post("/login", userController.logIn)
router.get("/profile", userController.getUserProfile)
router.patch("/profile", userController.applyUserChanges)
router.get("/requests", userController.getRequests)
router.get("/requests/:requestId", userController.getRequest)
router.get("/services", userController.getServices)
router.get("/services/:serviceId", userController.getServiceAndRules)
router.post("/requests/service/:serviceId", userController.submitRequest)
router.patch("/requests/:requestId", userController.cancelRequest)

module.exports = router