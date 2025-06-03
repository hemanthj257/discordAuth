var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username : {
    type : mongoose.Schema.Types.String,
    required : true,
    unique : true
  },
  password : {
    type : mongoose.Schema.Types.String,
    required : true,
  }
})

const User = mongoose.model("User", userSchema);
module.exports = {User};