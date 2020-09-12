// creating monkey, ground and banana
var monkey, monkey_running;
var ground;
var bananaImg, stoneImg;
var bananaGroup, stonesGroup;
var survivalTime = 0;
var  PLAY = 1;
var END = 0;
var gameState = 1;


function preload(){
  // adding images to monkey and banana
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 
 bananaImg = loadImage("banana.png");
 stoneImg  = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600,600);
  
 // creating monkey
  monkey = createSprite(50,410,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  // creating ground
  ground = createSprite(250,470,1200,10);
  

  bananaGroup = createGroup();
  stonesGroup = createGroup();
}


function draw() {
  background("lightblue");

  // reseting the ground
  if(ground.x <0){
    ground.x = ground.width/2
  }
 
 
   //jump when the space key is pressed
   if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -20;}

    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.9

    // make the monkey to collide with the ground
    monkey.collide(ground);
  


  if(gameState === PLAY){
    
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survivalTime : " +survivalTime, 10,50);
    
    if(monkey.isTouching(stonesGroup)){
    gameState =END;
    }
    
    ground.velocityX = -10;
    
    
     //calling the function
    spawnBanana();
    spawnStones();
     }
 
  
  
  else if(gameState === END){
       bananaGroup.destroyEach();
    stonesGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
    stonesGroup.setVelocityXEach(0);
         
    text("YOU LOSE ",290,300);
    stroke("black");
    fill("black");
  }
   

  drawSprites();
}

function spawnBanana(){
  //creating banana
 if(frameCount %80 === 0){
  var banana = createSprite(520,34,20,20); 
  banana.addImage(bananaImg);
  banana.scale = 0.05;
  banana.y = Math.round(random (120,200))
  banana.velocityX = -2;
  banana.lifetime = 260;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
  bananaGroup.add(banana);

 }

}


function spawnStones(){
 if(frameCount %300 === 0){
   var stone = createSprite(530,435,20,20);
   stone.addImage(stoneImg);
   stone.scale = 0.2;
   stone.velocityX = -2;
   stone.lifetime = 250;
   stonesGroup.add(stone);
 }

}


