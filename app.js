const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const app = express();
// set view engine of the application as EJS
app.set("view engine", "ejs");

// configure app to use body-parser and static file
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", (req,res)=>{
  res.render("home", {
    posts: posts
  })
});

app.get("/compose", (req,res)=>{
  res.render("compose");
});

app.post("/compose", (req,res)=>{
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
})

// use route parameters to access variable from url
app.get("/posts/:postName", (req,res)=>{
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(post=>{
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle === requestedTitle){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});


app.listen(3000, ()=>{
  console.log("Server is running on port 3000.");
});
