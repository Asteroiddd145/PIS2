require("dotenv").config()

const express = require("express")
const path = require("path")
const session = require("express-session")
const expressLayouts = require("express-ejs-layouts")

const adminRouter = require("./src/routes/admin.routes")
const civilServantRouter = require("./src/routes/civilServant.routes")
const userRouter = require("./src/routes/user.routes")

const authUserMiddleware = require("./src/middleware/authUserMiddleware")
const authAdminMiddleware = require("./src/middleware/authAdminMiddleware")
const authCivilServantMiddleware = require("./src/middleware/authCivilServantMiddleware")

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
  res.locals.warningMessage = req.session.warningMessage || null
  delete req.session.errorMessage
  delete req.session.warningMessage
  next()
})

app.get("/", (req, res) => {
  res.render("choice", {
    title: "Выбор роли",
    stylesheet: "choice.css"
  })
})

//#region user

app.get("/user/login", (req, res) => {
  res.render("login", {
    title: "Вход",
    stylesheet: "auth.css",
    api: "/api/user/login",
    link: "/user/login",
    additional: '<div><a href="/user/signup">Зарегистрироваться</a></div>'
  })
})

app.get("/user/signup", (req, res) => {
  res.render("signup", {
    title: "Регистрация",
    stylesheet: "auth.css"
  })
})

app.get("/user/services", authUserMiddleware, (req, res) => {
  res.render("userServices", {
    title: "Услуги",
    stylesheet: "services.css"
  })
})

app.get("/user/services/:serviceId", authUserMiddleware, (req, res) => {
  res.render("userFullService", {
    title: "Услуга",
    stylesheet: "service.css"
  })
})

app.get("/user/profile", authUserMiddleware, (req, res) => {
  res.render("profile", {
    title: "Профиль",
    stylesheet: "profile.css"
  })
})

app.get("/user/requests", authUserMiddleware, (req, res) => {
  res.render("userRequests", {
    title: "Заявки",
    stylesheet: "requests.css"
  })
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Ошибка')
    res.clearCookie('connect.sid')
    res.redirect('/')
  })
})

//#endregion

//#region admin

app.get("/admin/login", (req, res) => {
  res.render("login", {
    title: "Вход",
    stylesheet: "auth.css",
    api: "/api/admin/login",
    link: "/admin/login",
    additional: ""
  })
})

app.get("/admin/services", authAdminMiddleware, (req, res) => {
  res.render("adminServices", {
    title: "Услуги",
    stylesheet: "services.css"
  })
})

app.get("/admin/services/new-service", authAdminMiddleware, (req, res) => {
  res.render("adminNewService", {
    title: "Новая услуга",
    stylesheet: "service.css"
  })
})

app.get("/admin/services/:serviceId", authAdminMiddleware, (req, res) => {
  res.render("adminFullService", {
    title: "Услуга",
    stylesheet: "service.css"
  })
})

//#endregion

//#region civil servant

app.get("/civilservant/login", (req, res) => {
  res.render("login", {
    title: "Вход",
    stylesheet: "auth.css",
    api: "/api/civilservant/login",
    link: "/civilservant/login",
    additional: ""
  })
})

app.get("/civilservant/requests", (req, res) => {
  res.render("civilServantRequests", {
    title: "Заявки",
    stylesheet: "requests.css"
  })
})

app.get("/civilservant/requests/:requestId", (req, res) => {
  res.render("civilServantRequest", {
    title: "Заявка",
    stylesheet: "requests.css"
  })
})

//#endregion

app.use("/api/admin", adminRouter)
app.use("/api/civilservant", civilServantRouter)
app.use("/api/user", userRouter)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))