const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("hey");
});
app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "dharm",
    email: "dharm@mail.com",
    username: "djk",
  });
  res.send(createdUser);
});

app.get("/update", async (req, res) => {
    console.log('heelo from update')
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "djk" },
    { name: "dharm singh jat" }
  );
  res.send(updatedUser);
});

app.get('/read',async (req,res)=>{
    const readUsers = await userModel.find()
    res.send(readUsers)
})

app.get('/delete', async (req,res)=>{
    const deleteUser = await userModel.findOneAndDelete({username:'singh'})
    res.send(deleteUser)
})

app.listen(3000);
