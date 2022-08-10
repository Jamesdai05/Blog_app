const User = require('../models/User');
const path = require('path');
// const { object } = require('joi');

module.exports = (req,res)=>{
  User.create(req.body, (error, user) => {
    // console.log(error)
    if (error){ 
      const validationErrors =Object.keys(error.errors).map(key=>error.errors[key].message)
      req.session.validationErrors=validationErrors
      // console.log(validationErrors)
      // console.log(errorMessages)
       return res.redirect('register'/*,{ 
        errors:errorMessages
      }*/);
    }
    res.redirect("/");
  });
}
