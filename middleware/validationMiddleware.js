const validateMiddelWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect("/posts/new");
  }
  next();
}

module.exports = validateMiddelWare