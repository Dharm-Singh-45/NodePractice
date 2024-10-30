const express = require("express");
const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const userModel = require("./models/user");
const user = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createUser = await userModel.create({
        username,
        email,
        password:hash,  //password converted
        age,
      });
    const token =   jwt.sign({email},'dharm')
      res.cookie('token',token)
      res.send(createUser);
    });
  });
});

app.get('/login',(req,res)=>{ 
    res.render('login')
})
app.post('/login',async(req,res)=>{
    const userLogin =await userModel.findOne({email:req.body.email})

    if(!userLogin) return res.send('something went wrong')
    
        bcrypt.compare(req.body.password,userLogin.password,(err,result)=>{

            if(result) {

                const token =   jwt.sign({email:userLogin.email},'dharm')
                res.cookie('token',token)
                res.send('yes you can login')  
            }
                
             else res.send('No, you cant login') 

        })
})

// logout
app.get('/logout',(req,res)=>{
     res.cookie('token',"")
     res.redirect('/')
})

app.listen(3000);
