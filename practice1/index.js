/*
setting up parser file 
dynamic routing 
data coming from frontend at backend route
 */

const express = require('express')
const app = express()
const path = require('path')

/* parsers */
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* for search static files */
app.use(express.static(path.join(__dirname,'public')))
/* ejs setup */
app.set('view engine','ejs')

/* Routers */
app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/profile/:username',(req,res)=>{
    
    res.send(`welcome ${req.params.username}`)
})


app.listen(3000)