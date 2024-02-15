const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://KUNAL:KUNAL@cluster.r1i93kj.mongodb.net/NOM_NOM_DASH?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(mongoURI);
  console.log("Database connected");
  const fetched_collection =
    mongoose.connection.db.collection("food_category_item");
  const food_category_item = await fetched_collection.find({}).toArray();
  global.food_category_item = food_category_item;

  console.log(global.food_category_item);

  const fetched_collection_Second =
    mongoose.connection.db.collection("food_category");
  const food_category = await fetched_collection_Second.find({}).toArray();
  global.food_category = food_category;

  console.log(global.food_category);
  // fetched_collection.find({}).toArray(function (err,data){
  //   const food_category= mongoose.connection.db.collection("food-category");
  // food_category.find({}).toArray(function (err,catdata){
  // if(err) console.log(err);
  // else{
  //   global.food_category_item=data;
  //   global.food_category=catdata;

  // console.log(global.food_category_item);
  // console.log(global.food_category);
  // }
  // })

  //   // if(err){
  //   //   console.log(err);
  //   // } else{
  //   //    global.food_category_item=data;
  //   //    console.log(global.food_category_item);
  //   // }
  // })
}

module.exports = main;
