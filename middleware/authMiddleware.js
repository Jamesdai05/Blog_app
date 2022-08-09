const User = require('../models/User');

const authMiddleWare= (req,res,next)=>{
  User.findById(req.session.UserId, (error,user)=>{
    if(error || !user)
      return res.redirect('/')
    next()
  })
}


module.exports = authMiddleWare