var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var getTime;

//create feed and lastFed variable here


function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //create feed the dog button here

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
  
}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //write code to read fedtime value from the database 
    

  //write code to display text lastFed time here

  getTime();

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  var food_stock_val = foodObj.getFoodStock();
  if (food_stock_val <= 0) {
    foodObj.updateFoodStock(food_stock_val * 0);
  } else {
    foodObj.updateFoodStock(food_stock_val - 1);
  }
}


function feedDog() {
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

async function getTime() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata");
  var responseJson = await response.json();
  console.log(responseJson.datetime);
  var datetime = responseJson.datetime
  var hour = datetime.slice(11, 13);
  console.log(hour);

  text("Last Feed: " + hour + "AM", 700, 95)
}