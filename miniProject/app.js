const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const post = require("./models/post");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {   
  res.render("index");
});
app.get("/login",(req, res) => {
  res.render("login");
});
app.get("/profile",isLoggedIn,async(req, res) => {
   let user = await userModel.findOne({email:req.user.email}).populate('posts');
   
  res.render("profile",{user});
});
app.get("/like/:id",isLoggedIn,async(req, res) => {
   let post = await postModel.findOne({_id:req.params.id}).populate('user');
   post.likes.push(req.user.userid)
   await post.save()
   
  res.redirect("/profile");
});

// posts

app.post("/post",isLoggedIn,async(req, res) => {
    let {content} = req.body
   let user = await userModel.findOne({email:req.user.email})
 const post = await  postModel.create({
    user:user._id,
    content
   })
  user.posts.push(post._id)
  await user.save()
  res.redirect('/profile')
});

app.post("/register", async (req, res) => {
  let { email, password, username, name, age } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("user already register");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash,
      });
      const token = jwt.sign(
        { email: email, userid: createdUser._id },
        "dharm"
      );
      res.cookie("token", token);
      res.send("registered");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
        const token = jwt.sign(
            { email: email, userid: user._id },"dharm");
            res.cookie("token", token);
            return res.status(200).redirect("/profile");
      
    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

// middleware

// function isLoggedIn(req, res, next) {
//   if (req.cookies.token === "") res.send("you must be logged in");
//   else {
//     let data = jwt.verify(req.cookies.token, "dharm");
//     req.user = data;
//   }
//   next();
// }
function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
      return res.redirect("/login");
    }
  
    try {
      const data = jwt.verify(req.cookies.token, "dharm");
      req.user = data; // Attach decoded data to request
      next();
    } catch (error) {
      res.clearCookie("token"); // Clear invalid token
      return res.redirect("/login"); // Redirect if verification fails
    }
  }
  

app.listen(3000);
