const express = require('express');
const app = express();
const mongoose =require('mongoose');
const port = 3003;
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

const ejs = require('ejs');
const BlogPost = require('./models/BlogPost');
const path= require('path');
const fileUpload =require('express-fileUpload');

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
// app.get("/",(req,res)=>{
//   res.send('Hello,world!');
// })



app.get('/', async (req, res) => {
  // list the blogposts without filtering condition 
  const blogposts = await BlogPost.find({})
  console.log(blogposts)
  res.render('index', {
    blogposts
  });
});

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
app.get('/post/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post', {
    blogpost
  });
});

app.get('/posts/new/', (req, res) => {
  res.render('create');
});

app.post('/posts/new', async (req, res) => {
  // console.log(req.body.title);
  // console.log((req.body.body));
  await BlogPost.create(req.body);
  res.redirect('/');
});

// post a blog and image to the server
app.post('/posts/store', async (req, res) => {
  let image = req.files.image
  image.mv(path.resolve(__dirname,"public/image/img",image.name),
    async(error)=>{
      await BlogPost.create({
        ...req.body,
        image: '/img/' + image.name
      })        
      res.redirect('/');
    });    
});

app.listen(port, ()=>{
  console.log(`app listening on port ${port}`);
})