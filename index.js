//const mongoose = require('mongoose')
const { request, response } = require('express')
const express = require('express')
const app = express()
require('dotenv').config()
const Person= require('./models/person')
const morgan = require('morgan');
const cors = require('cors')


//const Person= require('./models/person')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('person', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))


let persons = [
  {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
  },

  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
 },
 
 {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345 "
 },

 {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
}
  
]

//app.get('/', (request, response) => {
  //response.send('<h1>Hello World!</h1>')
//})

//app.get('/api/persons', (request, response) => {
  //response.json(persons)
//})



app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/info', (request, response) => {
  const date= new Date
  Person.find({}).then(persons => {
    const num= persons.length
    response.send(`<p>Phonebook has info for ${num} people</p><p> ${date} </p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  console.log(request.params.id)
  Person.findById(request.params.id)
        .then(person =>{
          if(person){
            response.json(person)
          }else{
            response.status(404).end()
          }
        })
        .catch(error => next(error))
})





app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive

}




//app.use(express.json({extended: false}));


app.post('/api/persons', (request, response) => {
  const body= request.body

  if(body.name === undefined){
    return response.status(400).json({error: 'name missing'})
  }

  const person= new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson =>{
    response.json(savedPerson)
  })
})

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



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

//const PORT = 3001
//const PORT = process.env.PORT || 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


