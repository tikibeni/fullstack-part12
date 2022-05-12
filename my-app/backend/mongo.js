const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Give password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.xxaw6.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Pelkkä yhdistäminen
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

// Lisääminen ja tallentaminen
if (process.argv.length === 5) {
  const person = new Person ({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(_result => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}