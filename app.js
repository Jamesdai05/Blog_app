
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose =require('mongoose');
const port = process.env.PORT || 8020;
const connStr = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vniy6mj.mongodb.net/test`;
// mongoose.connect(connStr, { useNewUrlParser: true });
const flash = require('connect-flash'); 

const newPostController = require('./controllers/newPost');
const listPostsController = require('./controllers/listPosts');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController=require('./controllers/loginUser');
const logoutUserController = require('./controllers/logout');

const ejs = require('ejs');
// const path= require('path');
const fileUpload =require('express-fileUpload');
const session= require('express-session')
// const loginUser = require('./controllers/loginUser');
const validateMiddelWare =require('./middleware/validationMiddleware');
const authMiddleWare = require('./middleware/authMiddleware');
const redirectiIfAuthenticated = require('./middleware/redirectedifauthenticated');


app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use("/posts/store", validateMiddelWare);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false, maxAge: 7200000 }
}))

app.use(flash());

//hide new post and conditionally display the navbar
global.loggedIn =null;
app.use("*", (req,res,next)=>{
  loggedIn = req.session.userId
  next();
})


// app.get("/",(req,res)=>{
//   res.send('Hello,world!');
// })



app.get('/', listPostsController);

app.get('/about', (req, res) => {
  res.render('about');
});

// app.get('/contact', (req, res) => {
//   res.render('contact');
// });

// retrieve a single post by id
app.get('/post/:id', getPostController);

// app.patch('/post/:id/edit',(req,res)=>{
//   const title = req.body.title
//   const id= req.params.artical_id

//       artical[ind].title = title;

//       res.redirect(`create`)
//     },


app.get('/posts/new/',authMiddleWare,newPostController);

// app.post('/posts/new', newPostController);

// post a blog and image to the server
app.post('/posts/store',authMiddleWare,storePostController);

app.get('/auth/register', redirectiIfAuthenticated, newUserController);
app.post('/users/register', redirectiIfAuthenticated,storeUserController);

app.get('/auth/login', redirectiIfAuthenticated,loginController);

app.post('/users/login',redirectiIfAuthenticated,loginUserController)

app.get('/auth/logout', redirectiIfAuthenticated,logoutUserController);
app.use((req,res)=>{
  res.render('Notfound')
})

app.listen(port, async()=>{
  try { 
    await mongoose.connect(connStr, { dbName: 'BlogPost'});
  } catch {
    console.log(`Failed to connect to DB`);
    process.exit(1)
  }
  console.log(`app listening on port ${port}`);
})