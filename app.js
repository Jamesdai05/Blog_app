const express = require('express');
const app = express();
const mongoose =require('mongoose');
const port = 3003;
const ejs = require('ejs');

app.use(express.static('public'));
app.set('view engine','ejs');

// app.get("/",(req,res)=>{
//   res.send('Hello,world!');
// })


app.get("/",(req,res)=>{
  // res.sendFile(path.resolve(__dirname,"views/index.html"))
  res.render("index")
});

app.get("/about", (req, res) => {
  res.render("about")

});

app.get("/contact", (req, res) => {
  res.render("contact")

});
app.get("/post", (req, res) => {
  res.render("post")
});

app.get("/posts/new", (req, res) => {
  res.render("create")
});

app.post("/posts/store", (req, res) => {
  console.log(req.body);
  res.redirct('/')
});

app.listen(port, ()=>{
  console.log(`app listening on port ${port}`);
})