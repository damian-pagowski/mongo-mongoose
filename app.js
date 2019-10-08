// 1# Add mongodb and mongoose to the project’s package.json. Then require mongoose. Store your mLab database URI in the private .env file as MONGO_URI. Connect to the database using mongoose.connect()
const mongoose = require('mongoose') // include ongoose into project
const server = '127.0.0.1:27017' // REPLACE WITH YOUR DB SERVER
const database = 'test' // REPLACE WITH YOUR DB NAME
// open connection to db
mongoose.connect(`mongodb://${server}/${database}`)
/// this one just for logging ON successful connection / fail
// let db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
//   console.log('Connected to DB!!!')
// })
// #2 Create a Model
// First of all we need a Schema. Each schema maps to a MongoDB collection. It defines the shape of the documents within that collection.

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  likes: {
    type: [String]
  }
})

personSchema.methods.greet = function () {
  console.log("hello, I'm " + this.name)
}

// The next step is compiling our schema into a Model.
let Person = mongoose.model('Person', personSchema)

// create a document with Model
let damian = new Person({
  name: 'Damian',
  age: 34,
  likes: ['Pad see ew', 'sticky rice']
})

// create multiple document with Model.create(arr)
const people = [
  { name: 'Vader', age: 100 },
  { name: 'Bolo', age: 70 },
  { name: 'Tiger', age: 1000 },
  { name: 'Damian', age: 15 },
  { name: 'Damian', age: 19 },
  { name: 'Damian', age: 21 },
  { name: 'Damian', age: 30 }
]
Person.create(people)

// save document
damian.save().then(data => {
  console.log('Saved Damian: ' + data)
  data.greet()
})

// use find to get document from DB
Person.find({ name: 'Damian' }).then(data =>
  console.log('Damian found: ' + data)
)
// FindOne
Person.findOne({ name: 'Damian' }).then(data =>
  console.log('Only one true Damian found: ' + data)
)

// find by id - 5d9b597c5d876414f40c3a9e
Person.findById('5d9b597c5d876414f40c3a9e').then(data =>
  console.log('Found By Id : ' + data)
)

// find-update-save

Person.findById('5d9b597c5d876414f40c3a9e', (err, data) => {
  if (err) {
    console.log('Threre were errors: ' + err)
  }
  if (data) {
    data.likes.push('sa-pa-gee-tee')
    data.save()
  }
})

// findOneAndUpdate
// Signature : A.findOneAndReplace(conditions, options, callback)
// The default is to return the original, unaltered document. If you want the new, updated document to be returned you have to pass an additional argument: an object with the new property set to true.
Person.findOneAndUpdate(
  { name: 'Damian' },
  { $set: { age: 20 } },
  { new: true },
  (err, doc) => {
    if (err) console.log('errors while findOneAndUpdate!')
    console.log('findOneAndUpdate : ' + doc)
  }
)
Person.findOneAndRemove(
  '5d9c4a0d9f37a1454087b97b',
  { remove: true },
  (err, data) => {
    if (err) {
      console.log(
        'there were problems with removing document' + JSON.stringify(err)
      )
    }
    console.log('Deleted data: ' + data)
  }
)

Person.deleteMany({ name: 'Damian' }).then((err, d) => {
  if (err) +console.log('Delete many with errorr: ' + JSON.stringify(err))
  console.log('Delete many output :' + d)
})
