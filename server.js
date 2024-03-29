const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json())

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/play_ground')
    .then(() => console.log('connected to mongodb....'))
    .catch( err => console.error('Could not connect to mongodb.....', err))


//create a schema for heroes
const heroesSchema = new mongoose.Schema ({
    name: String,
    hero_type: String,
    ability: String,
    date_published: { type: Date, default: Date.now }
})

//create a model for heroes
const Heroes = mongoose.model('Heroes', heroesSchema);

//create a document
// async function createHeroes() {
//     const heroes = new Heroes({
//         name: 'Liza',
//         hero_type: 'intelligence',
//         ability: 'Liza can use her power to attract all of her opponents attention'
//     })

//     const result = await heroes.save();
//     console.log(result);
// }

//get all documents in mongodb
async function getHeroes() {
    const heroes = await Heroes.find();
 
    console.log(heroes);
}

// createHeroes();
getHeroes();



const customers = [
    {
        id: 1,
        name: 'Jessa'
    },
    {
        id: 2,
        name: 'Mae'
    },
    {
        id: 3,
        name: 'Jai'
    }
]

//GET requests

app.get('/', ( req, res ) => {
    res.send('hello api')
})

app.get('/customers', (req, res) => {
    res.send(customers)
})

app.get('/customers/:id/', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer){
        res.status(404).send('the customer with the given id CANNOT FOUND')
    }
     else {
        res.send(customer)
     }   
})

//POST requests

app.post('/customers', (req, res) => {

    const { error } = validateCustomer(req.body);

    if(error){
        //400 badrequest
        res.status(400).send(error.details[0].message);
        return;
    }

    const customer = {
        id: customers.length+1,
        name: req.body.name
    }

    customers.push(customer);
    res.send(customer);
})


//PUT requests

app.put('/customers/:id', (req, res) => {

    //look for custumer if exists
    const customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer){
        res.status(404).send('the customer with the given id CANNOT FOUND')
    }

    //Validation 
    const { error } = validateCustomer(req.body);

    if(error){
        //400 badrequest
        res.status(400).send(error.details[0].message);
        return;
    }

    //update course
    customer.name = req.body.name;
    res.send(customer);
})


app.delete('/customers/:id', (req, res) => {
    //look for custumer if exists
    const customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer){
        res.status(404).send('the customer with the given id CANNOT FOUND')
    }

    //delete
    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    //return deleted customer
    res.send(customer)
})


//function for validating body
function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(customer, schema);
}


//Port

const port = process.env.PORT || 3000;


app.listen( port, () => {
    return(
        console.log(`It is listening to port ${port}`)
    )
} )