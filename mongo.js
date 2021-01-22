const mongoose= require('mongoose')
require('dotenv').config()

let url= process.env.MONGOLAB_URI;
let password= process.env.DB_PASS;

//console.log('process.argv[3] is ' + process.argv[2])
if(process.argv.length === 5 && process.argv[2] === password){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person= mongoose.model('Person', personSchema);
    const person= new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        let name= result.name
        let number= result.number
        console.log(`added ${name} ${number} to phonebook`)
        mongoose.connection.close()
    })

}else if(process.argv.length === 3 && process.argv[2] === password){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person= mongoose.model('Person', personSchema);
    console.log("phonebook:")
    Person.find({}).then (result => {
        result.forEach(person => {
            let name= person.name
            let number= person.number
            console.log(`${name} ${number}`)
        })
        mongoose.connection.close()
    })
}