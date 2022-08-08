const mongoose =require('mongoose');

const BlogPost = require('../models/BlogPost');

mongoose.connect('mongodb://localhost/mydatabase',{useNewUrlParser:true});

BlogPost.create({
  title:"how to link to the mongodb through wsl",
  Body:"If you dont know how to connect the database, then you dont know how to link your data."
}),(error,BlogPost)=> {
  console.log(error,BlogPost);
}



module.exports = BlogPost;