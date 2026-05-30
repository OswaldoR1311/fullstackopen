const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to url', url)
mongoose
  .connect(url, { family: 4 })
  .then(result => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB', error.message))

const personSchema = new mongoose.Schema({
  name: {
    minLength: 3,
    required: true,
  },
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  },
})

module.exports = new mongoose.model('Person', personSchema)
