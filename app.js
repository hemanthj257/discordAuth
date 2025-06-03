var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var MongoStore = require('connect-mongo');
require('dotenv').config()

// var pl = require('./Strategies/local_strategy');
var passport_discord = require('./Strategies/discord_strategy');

var app = express();
app.use(cookieParser('secret')); //signed cookie

//create the session before the routes
app.use(
  session({
    secret : "hehe",
    saveUninitialized : true,
    resave : true, 
    cookie : {
      maxAge : 60000 * 60 * 24,
    },
    store : MongoStore.create({
      mongoUrl : process.env.MONGO_URL
    }),
  })
)

app.use(passport.initialize());
app.use(passport.session());

var api = require('./routes/routes');

mongoose
  .connect("mongodb://localhost:27017/CRUD_users")
  .then( () => console.log("connected to database"))
  .catch( (err) => console.log(`Error : ${err}`));

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(api);

// app.post('/auth', pl.authenticate("local"), (req, res)=> {
//   res.sendStatus(201);
// })

app.get('/api/auth/discord', passport_discord.authenticate('discord'));

app.get('/api/auth/discord/redirect', passport_discord.authenticate('discord'), (req, res) => {
  res.sendStatus(200)
  console.log(req.session);
  console.log(req.user);
})

app.get('/auth/status', (req, res)=> {
  return req.user ? res.send(req.user) : res.sendStatus(401);
})

app.post('/auth/logout', (req, res) => {
  req.logout( (err) => {
    if(err) res.sendStatus(401);
    res.send("logged out!");
  })
})

app.use('/', (req, res) => {
  res.cookie("auth", "user", {maxAge : 60000 * 60 * 24, signed : true}); //create the cookie
  res.send("this is root");
})

app.listen(port, () => {
  console.log("app started at port", port);
})