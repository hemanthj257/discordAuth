var express = require('express')
var {checkSchema, validationResult, matchedData} = require('express-validator')

var {validationSchema} = require('../utils/checkSchema');
var {User} = require('../mongoose/schema/schema');
const hashingPassword = require('../utils/helpers');

var api = express.Router()

api.post('/users', checkSchema(validationSchema), async (req, res) => {
  const result = validationResult(req);
  if(!result.isEmpty) return res.send(result.array());
  
  const data = matchedData(req);
  data.password = hashingPassword(data.password);
  console.log(data.password);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch(err){
    console.log(err);
    return res.status(401).send(result.array());
  }
})

module.exports = api;