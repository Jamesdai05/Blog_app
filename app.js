const express = require('express');
const app = express();
const mongoose =require('mongoose');
const port = 3003;
const connStr = 'mongodb://localhost/my_database';
// mongoose.connect(connStr, { useNewUrlParser: true });
 

const newPostController = require('./controllers/newPost');
const listPostsController = require('./controllers/listPosts');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController=require('./controllers/loginUser');

const ejs = require('ejs');
const BlogPost = require('./models/BlogPost');
const path= require('path');
const fileUpload =require('express-fileUpload');
const loginUser = require('./controllers/loginUser');
const validateMiddelWare =(req,res,next)=>{
  if(req.files ==null || req.body.title == null){
    return res.redirect("/posts/new");
  }
  next();
}


app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
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

// retrieve a single post by id
app.get('/post/:id', getPostController);

app.get('/posts/new/', newPostController);

// app.post('/posts/new', newPostController);

// post a blog and image to the server
app.post('/posts/store',storePostController);

app.get('/auth/register', newUserController);
app.post('/users/register',storeUserController);

app.get('/auth/login', loginController);

app.post('/users/login',loginUserController)

app.listen(port, async()=>{
  try { 
    await mongoose.connect(connStr, { useNewUrlParser: true });
  } catch {
    console.log(`Failed to connect to DB`);
    process.exit(1)
  }
  console.log(`app listening on port ${port}`);
})