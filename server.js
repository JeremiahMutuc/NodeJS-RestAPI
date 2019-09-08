const express = require('express');
const app = express();


app.get('/', ( req, res ) => {
    res.send('Hello First Route!')
})


app.listen( 3000, () => {
    return(
        console.log('It is listening')
    )
} )