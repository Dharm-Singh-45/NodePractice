const express = require('express');
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// cookies
/* const cookieParser = require('cookie-parser')
app.use(cookieParser()) */

/* app.get('/',(req,res)=>{
    res.cookie("name",'dharm')
    res.send('done')
})
app.get('/read',(req,res)=>{
   console.log(req.cookies)
    res.send('done')
}) */

/* ------------------------------------------------------------------------------ */

// const bcrypt = require('bcrypt');

// password encrypt
/* app.get('/',(req,res)=>{

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("dharm", salt, function(err, hash) {
            // Store hash in your password DB.
            console.log(hash)
        });
    });
}) */


// password Decrypt
/* app.get('/',(req,res)=>{

    bcrypt.compare('dharm', '$2b$10$2NoVEhYc6X7AX0V.f9BbZuHGAByhDuLwhLg8rs71uIvvHB9aSMm7W', function(err, result) {
        // result == true
        console.log(result)
    });
}) */

/* ------------------------------------------------------------------------- */

//jwt

/* const jwt = require('jsonwebtoken')

app.get('/',(req,res)=>{
    const token = jwt.sign({email:'dharm@mail.com'},'secret')
    res.cookie('token',token)
    res.send('done')
})

app.get('/read',(req,res)=>{
    const data = jwt.verify(req.cookies.token, "secret")
    console.log(data)
})
 */




app.listen(3000)