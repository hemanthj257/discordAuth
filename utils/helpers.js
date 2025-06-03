var bcrypt = require('bcrypt');

const saltRounds = 10; //default rounds recommended in the documentation

const hashingPassword = (password) => {
  password = password.toString();
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log(salt);
  return bcrypt.hashSync(password, salt);
}

const comparePassword = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed);
}

module.exports = hashingPassword, comparePassword;