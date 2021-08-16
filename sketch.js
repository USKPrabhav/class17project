var trex,trex_running,edges;
var cloud,cloudImage
var groundImage,ground,invisibleGround;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score=0;
var obstaclesGroup,cloudsGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOverImage,restart,restartImage;
var jumpSound,dieSound,checkPointSound;


function preload(){

      trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
        trex_collided=loadAnimation("trex_collided.png")
      groundImage=loadImage("ground2.png");
      cloudImage=loadImage("cloud.png");
      obstacle1=loadImage("obstacle1.png")
      obstacle2=loadImage("obstacle2.png")
      obstacle3=loadImage("obstacle3.png")
      obstacle4=loadImage("obstacle3.png")
      obstacle5=loadImage("obstacle5.png")
      obstacle6=loadImage("obstacle6.png")
      gameOverImage=loadImage("gameOver.png");
      restartImage=loadImage("restart.png")
      jumpSound=loadSound("jump.mp3");
      dieSound=loadSound("die.mp3");
      checkPointSound=loadSound("checkpoint.mp3");



    }
function setup(){

      createCanvas(600,200);

      
      //create a trex sprite
      trex=createSprite(50,160,20,20);
      trex.addAnimation("running",trex_running);
       trex.addAnimation("collided",trex_collided);
      trex.scale=0.5;
      trex.setCollider("circle",0,0,40)
      trex.debug=true;

      //create a ground sprite
      ground=createSprite(200,180,400,20);
      ground.addImage(groundImage)

      gameOver=createSprite(300,100);
      gameOver.addImage(gameOverImage);

      restart=createSprite(300,140);
      restart.addImage(restartImage);

      gameOver.scale=0.5
      restart.scale=0.5;
    

      //create an invisible Ground
      invisibleGround=createSprite(200,190,400,10);
      invisibleGround.visible=false
  
      edges=createEdgeSprites();

      var ran=Math.round(random(10,60));
      console.log(ran);
      console.log("Hello"+ 5)
   
      obstaclesGroup=new Group();
      cloudsGroup=new Group();  
}

function draw(){

      background(180);
  
      text("score:"+score,500,50);

      if(gameState === PLAY){

        gameOver.visible=false;
        restart.visible=false;

        ground.velocityX=-(2+score/100);

        score=score+Math.round(frameCount/60);

        if(ground.x<0){
                ground.x=ground.width/2;
              }
        if(score>0 && score%100===0){
                checkPointSound.play();
        }
              
      if(keyDown("space") && trex.y>150){
        trex.velocityY=-10;
        jumpSound.play();
      }
      trex.velocityY=trex.velocityY+0.8;

      spawnClouds();

      spawnObstacles();

      if(obstaclesGroup.isTouching(trex)){
              //trex.velocityY=-10;
             // jumpSound.play();
              gameState=END;
              dieSound.play();
      }
      }
      else if(gameState === END){
        ground.velocityX=0;
        gameOver.visible=true;
        restart.visible=true;
        trex.changeAnimation("collided",trex_collided);
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);

        if(mousePressedOver(restart)){
          reset();
        }

      }
  

      trex.collide(invisibleGround);

      drawSprites();
}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;

  score=0;
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running",trex_running);


}

function spawnClouds(){
  if(frameCount % 60 ===0){

  cloud=createSprite(600,100,40,10);
  cloud.addImage(cloudImage);
  cloud.velocityX=-2;
  cloud.scale=0.7;
  cloud.y=Math.round(random(10,60));
  cloud.lifetime=300;

   cloud.depth=trex.depth;
   trex.depth=trex.depth+
   cloudsGroup.add(cloud);

  }
}
function spawnObstacles(){
  if(frameCount % 60 === 0){
  obstacle = createSprite(600,165,10,40);
  obstacle.velocityX=-(2+score/100);
  var rand=Math.round(random(1,6));

  switch(rand){
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    case 3: obstacle.addImage(obstacle3);
            break;
    case 4: obstacle.addImage(obstacle4);
            break;
    case 5: obstacle.addImage(obstacle5);
            break;
    case 6: obstacle.addImage(obstacle6);
            break;
   default:break;
  }
 obstacle.lifetime=150;
 obstacle.scale=0.5
 obstaclesGroup.add(obstacle);

  }


}