const express = require("express")

const adminRouter = require("./routes/admin.routes")
const civilServantRouter = require("./routes/civilServant.routes")
const userRouter = require("./routes/user.routes")

const PORT = process.env.PORT || 14500

const app = express()

app.use(express.json())

app.use("/api", adminRouter)
app.use("/api", civilServantRouter)
app.use("/api", userRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))