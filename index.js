const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan');
const app = express()
app.use(express.json())

app.use(morgan('tiny'));


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




//app.use(express.json({extended: false}));

app.post('/api/persons', (request, response) =>{
  const body= request.body;
  //console.log(body, typeof body);
  const dupName= persons.find(person => person.name === body.name)
  //console.log(dupName);


  if(!body.name){
    return response.status(400).json({
      error: 'name missing'
    })
  }
  
 if(!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
 }
  
 if(dupName){
    return response.status(400).json({
      error: 'Name already in phonebook'
    })
  }

  const person= {
    id: getRandomInt(5, 100),
    name: body.name,
    number: body.number
  }

  persons= persons.concat(person);
  //console.log(pm.response.json())
  response.json(person);
  

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


