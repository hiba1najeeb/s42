var bg1,bg;
var boy,boy1;
var invisibleground;
var coin,coin1,coinGroup;
var coinSound,jumpSound;
var animal,animal1,animalGroup;
var overSound,over,over2;
var PLAY = 1 ;
var END = 0;
var gameState = PLAY;
var score;
var reset,r1;

function setup() {
  createCanvas(windowWidth,windowHeight); 

  bg=createSprite(width/2,height/2,width,height)
  bg.addImage(bg1)
  bg.x = bg1.width/2;
  bg.scale = 1.1
  bg.velocityX =-5;

  reset=createSprite(windowWidth-100,50,10,10)
  reset.addImage(r1)
  reset.scale = 0.25
  reset.visible = false;
  
  score=0;
 
  over=createSprite(width/2,height/2,10,10)
  over.addImage(over2)
  over.scale = 0.1
  over.visible= false
  



  boy= createSprite(width/2-550,height - 190,30,30)
  boy.addAnimation("boys",boy1)
  boy.scale = 1.2


  invisibleground = createSprite(width/2-600,height - 90,width,2)
  invisibleground.visible = false

  coinGroup = new Group();
  animalGroup = new Group();

}
function preload(){
coinSound = loadSound("coin.wav")
jumpSound = loadSound("jump.wav")
overSound = loadSound("over.wav")

  r1= loadImage("reset.png")
  bg1=loadImage("bg.jpg")
  bg2=loadImage("bg1.jpg")
  boy1 = loadAnimation("p1.png","p2.png","p3.png","p4.png","p5.png","p6.png","p7.png","p8.png","p9.png","p10.png")
  coin1 = loadAnimation("c1.png","c2.png","c3.png","c4.png","c5.png","c6.png","c7.png","c8.png","c9.png")
  animal1 = loadImage("fox.png")
  collideboy= loadImage("collidedprince.png")
  over2= loadImage("over.png")

}
function draw() {
  background(bg2);

  spawnAnimals();
  spawnCoins();
if(gameState === PLAY){

  for(var i =0; i<coinGroup.length;i++){
  if(coinGroup.get(i).isTouching(boy)){
  score = score+50
  coinGroup.get(i).destroy()
  coinSound.play();
}

  }
  bg.velocityX =-5;
  boy.visible = true;

  if(animalGroup.isTouching(boy)){
        
  overSound.play()
  gameState = END;
  }
  
  if(bg.x <0){
    bg.x = bg.width/2
   }

   if (keyDown("space")){
  boy.velocityY = -15
  jumpSound.play()
}
  boy.velocityY = boy.velocityY +1
     
}else if(gameState ===END){

  console.log ("END")
boy.velocityY = 0;

animalGroup.setVelocityXEach(0)

//boy.visible = false;
animalGroup.destroyEach();

reset.visible= true;
over.visible = true;
boy.visible = false;

coinGroup.destroyEach();
bg.velocityX =0

if(mousePressedOver(reset)){

  gameState =PLAY;
score = 0;
boy.visible = true;
reset.visible= false;
over.visible = false;
}



}






    

    boy.collide(invisibleground)
    drawSprites();
    fill("white")
    textSize(25)
    text("Coins Collected : "+ score,75,50)

 
}
function spawnCoins(){
  if(frameCount % 200 ===0){
  coin = createSprite(width,height - 120,width,2)
  coin.y =Math.round(random(height/2-100,height-120))
  coin.addAnimation("coin",coin1)
  coin.velocityX =-5;

  coinGroup.add(coin)
  }
}
function spawnAnimals(){
  if(frameCount % 100 ===0){
    animal = createSprite(width,height - 120,width,2)
    animal.y =Math.round(random(height-80,height - 100))
    animal.addImage(animal1)
    animal.velocityX =-25;
    
    animal.setCollider("rectangle",40,-75,90,80)
    animalGroup.add(animal)
}
}