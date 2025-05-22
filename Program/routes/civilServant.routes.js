const Router = require("express")
const router = new Router()
const civilServantController = require("../controllers/civilServant.controller")

router.post("/civilServant/login", civilServantController.logIn) // ✓

module.exports = router