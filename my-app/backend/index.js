require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('person', (req) => {
  return JSON.stringify(req.body)
})

// Random ID-generaattori paikallisille yhteystiedoille
const generateId = () => {
  return Math.floor(Math.random() * Math.floor(10000))
}

// Yleisinfojen hakeminen
app.get('/info', (req, res) => {
  const pvm = new Date()

  Person.find({}).then(result => {
    res.send(`<p>Phonebook has info for ${result.length} people</p> <p>${pvm}</p>`)
  })
})

// Palvelimen puhelinluettelon haku
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

// Yksittäisen henkilön yhteystiedon (json) haku tietokannasta
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Yksittäisen yhteystiedon poisto tietokannasta
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(_result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// Morganin konfigurointi juuri ennen POST-metodia, jotta se näyttää POST-pyynnön sisällön
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

// Yhteystiedon lisääminen tietokantaan. Id:n generointi vain paikallisella kannalla.
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

// Yhteystiedon päivittäminen tietokannassa
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// 404 middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Middleware, joka käsittelee virhetilanteita
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ message: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})