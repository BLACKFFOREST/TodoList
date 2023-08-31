//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-lukacovic:EPxm6GvN3c5Dz16T@testingcluster.w5fwrjp.mongodb.net/?retryWrites=true&w=majority/todoList");

const itemSchema = {  
  name : String
}


const Item = mongoose.model("Item",itemSchema);

const cleanHouse = new Item({name:"Clean house"});

const vacuum = new Item({name:"Vacuum house"});


const takeTrash = new Item({name:"Take out trash from house"});

const defaultItems = [cleanHouse,vacuum,takeTrash];


async function dataLength(){
  const itemsData = await Item.find({});
  if(itemsData.length === 0){
    console.log(itemsData.length);
    Item.insertMany(defaultItems);
  }else{
    console.log(itemsData.length);
  }
};
dataLength();






const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res) {

const day = date.getDate();

async function dataFetch(){
  const itemsData = await Item.find();
  res.render("list", {listTitle: day, newListItems: itemsData});
};
dataFetch();
  

});

async function dataInsert(item){
  await Item.insertMany([{name:item}]);
};


app.post("/", function(req, res){

  const item = req.body.newItem;
  console.log();
  dataInsert(item);
  
  res.redirect("/");



});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
