// let mongoose = require('mongoose')

// let emailSchema = new mongoose.Schema({
//   email: String
// })

// module.exports = mongoose.model('Email', emailSchema)



let mongoose = require('mongoose')
let validator = require('validator')

// example schema compiled to model and exported
// convention for storing files with schema/models is /models directory 
let emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  }
})

module.exports = mongoose.model('Email', emailSchema)