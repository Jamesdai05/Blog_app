const BlogPost = require('../models/BlogPost');


module.exports = async (req, res) => {
  // list the blogposts without filtering condition 
  console.log(req.session);
  const blogposts = await BlogPost.find({}).populate('userid')
  // console.log(blogposts)
  res.render('index', {
    blogposts
  });
};