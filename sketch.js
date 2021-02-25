
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivaltime=0;
var ground;

var Play=1;
var End=0;
var gameState=Play;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX= -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
}


function draw() {
    createCanvas(600,600);
   
  
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  if (gameState===Play) {
  
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (keyDown("space")&&monkey.y>280) {
    monkey.velocityY = -15;
    

  }
  
  
  spawnbanana();
  spawnobstacles();
  
  //add path
  monkey.collide(ground);
    
    survivaltime = survivaltime +               Math.round(frameCount/200);
     
    if (monkey.isTouching(obstacleGroup)) {
      gameState=End;
      
    }
  }
  
  if (gameState===End) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacle.velocityX=0;
    banana.velocityX=0;
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    
  }
  
  
  
  text("Survival Time: "+ survivaltime,250,50);
  stroke("black");
  testSize=20;
  fill("black");
  
  drawSprites();
  
}

function spawnbanana() {
  
  if (frameCount % 100 === 0) {
  banana = createSprite(500,200,20,20);
  banana.y=Math.round(random(120, 200));
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifetime=200;
    
  banana.velocityX = -(6 + survivaltime/150);
  
  bananaGroup.add(banana);
  }
}

function spawnobstacles() {
  
  if (frameCount % 300 === 0) {
  obstacle = createSprite(500,300,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  
  obstacle.velocityX = -(6 + survivaltime/100);
  
  obstacleGroup.add(obstacle);
}

}

