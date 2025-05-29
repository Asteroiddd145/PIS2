function authUserMiddleware(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/user/login")
  }
  next()
}

module.exports = authUserMiddleware