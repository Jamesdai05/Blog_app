const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true });

// BlogPost.create({
//   title: "how to link to the mongodb through wsl",
//   body: "If you dont know how to connect the database, then you dont know how to link your data."
// }, (error, BlogPost) => {
//   console.log(error, BlogPost);
// })
// ready the data from the database
// BlogPost.find({},(error,blogpost)=>{
//   console.log(error,blogpost)
// })
// const id = 'new ObjectId("62f08aa64fb319e37b198f1d")'

BlogPost.find({ title:'how to link to the mongodb through wsl'},(error,blogpost)=>{
  console.log(error,blogpost)
});

// BlogPost.findByIdAndUpdate({ title="" }, (error, blogpost) => {
//   console.log(error, blogpost)
// });







module.exports = BlogPost;