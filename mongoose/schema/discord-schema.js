var mongoose = require('mongoose');

const discordSchema = mongoose.Schema({
  username : {
    type : mongoose.Schema.Types.String,
    required : true,
    unique : true
  },
  discordId : {
    type : mongoose.Schema.Types.String,
    required : true,
    unique : true
  }
})

const discordUser = mongoose.model("discordUser", discordSchema);
module.exports = {discordUser};