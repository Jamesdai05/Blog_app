const express = require('express');
const app = express();
const mongoose =require('mongoose');
const port = 3003;
const ejs = require('ejs');

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.get("/",(req,res)=>{
//   res.send('Hello,world!');
// })

const BlogPost= require("./models/BlogPost");

app.get('/', async (req, res) => {
  // list the blogposts 
  const blogposts = await BlogPost.find({})
  console.log(blogposts)
  res.render('index', {
    blogposts
  });
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
  res.render("create");
  
});
app.post("/posts/store",async(req, res) => {
  await BlogPost.create(req.body);
    // console.log(req.body);
    res.redirect("/");
  
});

// app.update("/posts/update",(req,res)=>{
  
// })

app.listen(port, ()=>{
  console.log(`app listening on port ${port}`);
})