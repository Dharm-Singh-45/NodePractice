const express = require("express");
const path = require('path')
const app = express();
const fs = require('fs')

app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.get("/", (req, res) => {
    const files = []; // Replace with actual files data, if available
    res.render("index", { files });
});

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details,function(err){
res.redirect('/')
    })
})

app.listen(3000);

