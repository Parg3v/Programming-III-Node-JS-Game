var express = require("express");
var app = express();

app.use(express.static("public"))

app.get("/", function(req, res){
    res.send("<h1> Hello &#128515 </h1>");
})

app.get("/google", function(req,res){
    res.redirect('https://www.google.com/');
})

app.get("/search/:value", function(req,res){
    res.redirect("https://www.google.com/search?q=" + req.params.value)
})

app.get("/game", function(req,res){
    res.redirect("index.html");
})

app.get("/*", function(req,res){
    res.send("<h1>Error: Not Found &#128546	</h1>")
})

app.listen(3000, function(){
    console.log("Example is running on port 3000");
})