//Create variables here
var happyDog, dogImage,dog;
var database;
var foodStock;
var foodStockLoc;


function preload()
{
  //load images here
  happyDog=loadImage("images/happydog.png");
  dogImage=loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(800, 700);
  database=firebase.database();

  dog = createSprite(250,250,10,10);
  dog.addImage("dogImage",dogImage);
  dog.scale=0.2;

  foodStockLoc=database.ref("dogFood");
  foodStockLoc.on("value",readStock, reportError);
}


function draw() {  
background(rgb(46,139,87));
textSize(20);
fill("red");
if(foodStock){
text("food :"+foodStock,700,50);

if(keyWentDown("up")){
  writeStock(foodStock)
  dog.addImage("happyDog",happyDog);
  
}

}


  drawSprites();
  //add styles here

}

function readStock(data){

  foodStock=data.val();


}

function writeStock(foodStock){
  
  if(foodStock<=0){
    foodStock=0;
  }else{
    foodStock--;
  }
  
  database.ref("/").set({
    dogFood:foodStock
  })
}

function reportError(){
  console.log("error");
}



