const express = require('express');
const app = express();
const mongoose =require('mongoose');
const port = 3003;
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

const newPostController = require('./controllers/newPost');
const listPostsController = require('./controllers/listPosts');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');



const ejs = require('ejs');
const BlogPost = require('./models/BlogPost');
const path= require('path');
const fileUpload =require('express-fileUpload');
const listPosts = require('./controllers/listPosts');
const validateMiddelWare =(req,res,next)=>{
  if(req.files ==null || req.body.title == null){
    return res.redirect("/posts/new");
  }
  next();
}


app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use("/posts/store", validateMiddelWare);



// app.get("/",(req,res)=>{
//   res.send('Hello,world!');
// })



app.get('/', listPostsController);

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// app.get('/post',(req, res) =>{
//   res.render('post');
// });

// retrieve a single post by id
app.get('/post/:id', getPostController);

app.get('/posts/new/', newPostController);

app.post('/posts/new', newPostController);

// post a blog and image to the server
app.post('/posts/store',storePostController);

app.listen(port, ()=>{
  console.log(`app listening on port ${port}`);
})