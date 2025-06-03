var passportDiscord = require('passport');
var {Strategy} = require('passport-discord');
var {discordUser} = require('../mongoose/schema/discord-schema')
require('dotenv').config()

passportDiscord.serializeUser( (user, done) => {
	done(null, user.id);
})

passportDiscord.deserializeUser( async (id, done) => {
	 try {
		const findUser = await discordUser.findById(id);
		if(!findUser) throw new Error("User ID not found")
		return done(null, findUser) 
	} catch(err) {
		done(err, null);
	}
})

passportDiscord.use(
  new Strategy({
    clientID : process.env.CLIENT_ID ,
    clientSecret : process.env.CLIENT_SECRET,
    callbackURL : process.env.CALLBACK_URL,
    scope : ["identify"],
  }, 
  		async (accessToken, refreshToken, profile, done) => {
			let findUser;
			try {
				findUser = await discordUser.findOne({ discordId: profile.id });
			} catch (err) {
				return done(err, null);
			}
			try {
				if (!findUser) {
					const newUser = new discordUser({
						username: profile.username,
						discordId: profile.id,
					});
					const newSavedUser = await newUser.save();
					return done(null, newSavedUser);
				}
				return done(null, findUser);
			} catch (err) {
				return done(err, null);
			}
		})
)

module.exports = passportDiscord;