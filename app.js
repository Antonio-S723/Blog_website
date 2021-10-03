
const express= require("express");
const ejs = require("ejs");
const app= express(); 
const _ = require('lodash');
const home_text={
    title:"Day 0",
    content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta non pulvinar neque. Iaculis nunc sed augue lacus viverra. Morbi tincidunt augue interdum velit euismod in. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Nunc vel risus commodo viverra maecenas accumsan lacus vel. Magna etiam tempor orci eu lobortis elementum nibh. Pellentesque dignissim enim sit amet venenatis urna. Mi bibendum neque egestas congue quisque egestas diam in arcu. In nulla posuere sollicitudin aliquam ultrices sagittis."
};
const about_text="Nec nam aliquam sem et tortor consequat id porta nibh. Congue quisque egestas diam in arcu cursus. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Nullam non nisi est sit amet facilisis. Eget dolor morbi non arcu risus quis varius quam quisque. Non pulvinar neque laoreet suspendisse. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Purus sit amet luctus venenatis lectus. Aliquam faucibus purus in massa tempor nec.";
const contact_text="Aliquam sem et tortor consequat id porta nibh venenatis cras. Sed turpis tincidunt id aliquet risus feugiat in. Faucibus et molestie ac feugiat sed lectus vestibulum. Bibendum est ultricies integer quis auctor elit sed vulputate. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Amet nisl purus in mollis nunc sed. Ac ut consequat semper viverra nam libero justo laoreet sit. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Tortor at risus viverra adipiscing at in tellus.";

var posts=[home_text];
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/about", function(req, res){
    res.render("about", {about: about_text});
});

app.get("/contact", function(req, res){
    res.render("contact", {contact: contact_text});
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.get("/", function(req, res){
    res.render("home", {postData:posts});
});

app.get("/posts/:post_name", function(req, res){
    const requested=_.lowerCase(req.params.post_name);
    var link={
        title: "",
        content: ""
    };
    posts.forEach(function(post){
        if(_.lowerCase(post.title)==requested){
            link=post;
        }
    });
    if(link.title==""){
        console.log("not found");
        res.redirect("/");
    }
    else {
        res.render("post", {post:link});
    }
});

app.post("/", function(req, res){
    const post={
        title:req.body.title,
        content:req.body.content
    };
    posts.push(post);
    res.redirect("/");
})


app.listen(3000, function(){
    console.log("Server up and running!");
});
