const express = require('express');
const app = express();

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

app.get('/', ( req, res ) => {
    res.send('hello api')
})

app.get('/customers', (req, res) => {
    res.send(customers)
})

app.get('/customers/:id/', (req, res) => {
    res.send(req.params)
})

//Port

const port = process.env.PORT || 3000;


app.listen( port, () => {
    return(
        console.log(`It is listening to port ${port}`)
    )
} )