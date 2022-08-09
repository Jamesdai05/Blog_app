const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt =require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  Passowrd: {
    type: String,
    required: true,
  }
});

UserSchema.pre("save", function(next){
  const user= this
  bcrypt.hash(user.Passowrd, 100,(error,hash)=>{
    user.Password = hash
    next()
  })
})



const User = mongoose.model('User', UserSchema);

module.exports = User;