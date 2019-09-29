const express = require('express');
const app = express();

app.use(express.json())

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
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    }

    customers.push(customer);
    res.send(customer);
})


//Port

const port = process.env.PORT || 3000;


app.listen( port, () => {
    return(
        console.log(`It is listening to port ${port}`)
    )
} )