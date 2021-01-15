const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response ) => {
  const num= persons.length;
  response.send('<p>Phonebook has info for ' + num + ' people</p><p>' + new Date + '</p>')
})

app.get('/api/persons/:id', (request, response) => {
  const id= Number(request.params.id)
  const person= persons.find(person => person.id === id)

  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  person = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive

}



app.post('/api/persons', (request, response) => {
  const ranId = getRandomInt(5, 100)

  const person = request.body
  person.id = ranId

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})