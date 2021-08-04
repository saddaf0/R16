var PLAY = 1;
var END = 0;
var gameState = 1;



var scene, sceneImg
var player, playerImg;
var titan,titanImg,titanGroup;
var invisibleBlock, invisibleBlock2;
var gameOver, gameOver_Img
var restart,restartImg;
var sound;
var score;


function preload(){
    sceneImg= loadImage("scene.png");
    playerImg= loadImage("character.png");
    titanImg= loadImage("titan.png");
    gameOver_Img= loadImage("gameOver.png");
    restartImg= loadImage("reset.png")
    sound= loadSound("gamesound.mp3")


}

function setup() {
    createCanvas(600,400);
    scene= createSprite(200,200,1500,1500);
    scene.addImage("abc",sceneImg);
   
   scene.scale=2
 
player= createSprite(100,330);
player.addImage("abc",playerImg);
player.scale= 0.35

gameOver= createSprite(300,150);
gameOver.addImage("over",gameOver_Img)
gameOver.scale= 0.5

restart= createSprite(300,250);
restart.addImage("reset", restartImg);
restart.scale= 0.2

 invisibleBlock2= createSprite(50,350,300,10)
 invisibleBlock2.visible= false
    
 score= 0;

titanGroup= new Group()
}

function draw() {
   
    text("Score:"+score,350,50)
if(gameState=== PLAY){
    
    score = score+Math.round(random(getFrameRate()/60));
sound.play()
scene.velocityX=-6
    gameOver.visible= false
    restart.visible= false

    console.log(score)
    if(score>0 && score%100 === 0){
      
    }

    if(keyDown("Space")){
        player.velocityY = -11;
    }
    player.velocityY=player.velocityY+1

if(scene.x<400){
    scene.x=scene.width/2
}

spawnTitans()

if (player.isTouching(titanGroup)){
    gameState= END
}
player.collide(invisibleBlock2)
}

else if(gameState=== END){
    sound.stop()
gameOver.visible= true
restart.visible= true
scene.velocityX=0

player.velocityY= 0
scene.velocityX= 0
titanGroup.setVelocityXEach(0)
}

if(mousePressedOver(restart)){

    reset()
}


 drawSprites()
textSize(20)
fill(0)
 text("Score:"+score,350,50)
}

function spawnTitans(){

    if(frameCount%80===0){
        titan= createSprite(900,290,10,10)
        titan.addImage("abc",titanImg)
        titan.scale= 0.15
        titan.velocityX= -5
        titan.lifetime= 390
        titanGroup.add(titan)
    }
}

function reset(){

    gameState= PLAY
   
    score = 0;
    titanGroup.destroyEach();
}
