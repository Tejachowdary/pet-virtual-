//Create variables here
var happyDog, dogImage,dog;
var database;
var foodStock=20;
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
text("food :"+foodStock,700,50);

if(keyWentDown("up")){
  foodStock--;
  dog.addImage("happyDog",happyDog);
  database.ref("/").set({
    dogFood:foodStock
  })
}


  drawSprites();
  //add styles here

}

function readStock(data){

  foodStock=data.val();


}

function reportError(){
  console.log("error");
}



