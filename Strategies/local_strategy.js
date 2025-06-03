var passportLocal = require('passport');
var {Strategy} = require('passport-local');
const { User } = require('../mongoose/schema/schema');
const comparePassword = require('../utils/helpers');

passportLocal.serializeUser( (user, done) => {
  done(null, user.id);
})

passportLocal.deserializeUser( async (id, done) => {
    try{
      const findUser = await User.findById(id);
      if(!findUser) throw new Error("User not found")
      done(null, findUser)
    } catch(err) {
      done(err, null);
    }
})

passportLocal.use(
  new Strategy ( async (username, password, done) => {
    console.log(`username : ${username}`);
    console.log(`password : ${password}`);
  
    try{
      const findUser = await User.findOne({username});
      if(!findUser) throw new Error("user not found");
      if(!comparePassword(password, findUser.password)) throw new Error("Invalid creds");
      done(null, findUser);
    } catch(err){
      done(err, null);
    }
  })
)

module.exports = passportLocal;
