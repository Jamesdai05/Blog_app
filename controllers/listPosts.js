const BlogPost = require('../models/BlogPost');


module.exports = async (req, res) => {
  // list the blogposts without filtering condition 
  const blogposts = await BlogPost.find({})
  console.log(blogposts)
  res.render('index', {
    blogposts
  });
};