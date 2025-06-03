
const validationSchema = {
  username : {
    isLength : {
      errorMessage : "Username should be 3-10 characters in length",
      options : {
        min : 3,
        max : 10
      }
    },
    notEmpty : {
      errorMessage : "Username should not be empty",
      required : true
    },
    isString : {
      errorMessage : "Username should be a string"
    }
  },

  password : {
    isLength : {
      options : {
        min : 4,
        max : 8
      },
      errorMessage : "Password should have 4-8 characters"
    },
    notEmpty :{
      errorMessage : "Password should not be empty"
    } 
  }
}

module.exports = {validationSchema};