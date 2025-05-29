function authAdminMiddleware(req, res, next) {
  if (!req.session.adminId) {
    return res.redirect("/admin/login")
  }
  next()
}

module.exports = authAdminMiddleware