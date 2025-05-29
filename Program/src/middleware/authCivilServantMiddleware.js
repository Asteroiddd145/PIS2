function authCivilServantMiddleware(req, res, next) {
  if (!req.session.civilServantId) {
    return res.redirect("/civilservant/login")
  }
  next()
}

module.exports = authCivilServantMiddleware