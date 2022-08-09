const redirectiIfAuthenticated = (req, res, next) => {
  if(req.session.UserId){
    return res.redirect('/');
  }
  next();
}


module.exports = redirectiIfAuthenticated

