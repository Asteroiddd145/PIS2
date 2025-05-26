require("dotenv").config()

const express = require("express")
const path = require("path")
const session = require("express-session")
const expressLayouts = require("express-ejs-layouts")

const adminRouter = require("./src/routes/admin.routes")
const civilServantRouter = require("./src/routes/civilServant.routes")
const userRouter = require("./src/routes/user.routes")

const authMiddleware = require("./src/middleware/authMiddleware")

const app = express()

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  res.locals.errorMessage = req.session.errorMessage || null
  delete req.session.errorMessage
  next()
})

app.get("/", (req, res) => res.redirect("/user/profile"))

app.get("/user/login", (req, res) => {
  res.render("login", {
    title: "Вход",
    stylesheet: "auth.css"
  })
})

app.get("/user/signup", (req, res) => {
  res.render("signup", {
    title: "Регистрация",
    stylesheet: "auth.css"
  })
})

app.get("/user/services", authMiddleware, (req, res) => {
  res.render("services", {
    title: "Услуги",
    stylesheet: "services.css"
  })
})

app.get("/user/services/:serviceId", authMiddleware, (req, res) => {
  res.render("fullService", {
    title: "Услуга",
    stylesheet: "service.css"
  })
})

app.get("/user/profile", authMiddleware, (req, res) => {
  res.render("profile", {
    title: "Профиль",
    stylesheet: "profile.css"
  })
})

app.use("/api/admin", adminRouter)
app.use("/api/civilservant", civilServantRouter)
app.use("/api/user", userRouter)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))