//variable image
var zombie,zombieImg;
var peaG, shootG,cherryG,flowerG,wallG,powerG;
var peashooter,sunflower,wallNut,cherryBomb,bg,sunImg,explosion;

var score=0,zombieKill =0;
var zombieHP = 250, wallnutHP=400;
var gameState="title";

function preload(){
  zombieImg= loadAnimation("Images/z1.png","Images/z2.png","Images/z3.png");
  peashooter = loadImage("Images/peashooter.png");
  sunflower = loadImage("Images/sunflower.png");
  wallNut = loadImage("Images/wall nut.png");
  cherryBomb = loadImage("Images/cherry bomb.png");
  bg = loadImage("Images/pvz bg.jpg");
  sunImg = loadImage("Images/sun.png");
  shootImg = loadImage("Images/Pea for Pvz.png");
  explosion = loadImage("Images/explosion.png");

  titleImg = loadImage("Images/title.png ")
  storyImg = loadImage("Images/story.png")
  //introImg = loadImage("Images/ ")
}
function setup() {
  createCanvas(displayWidth , displayHeight);
  
  //creating groups
  peaG = createGroup();
  shootG = createGroup();
  cherryG = createGroup();
  flowerG = createGroup();
  sunG = createGroup();
  wallG = createGroup();
  powerG = createGroup();
  zombieG = createGroup();

  //button
  button=createButton("NEXT")
  button.position(550,500)
  button.size(100,60)

  //screens
  screen = createSprite(675,300);
  
  
  
}
function draw() {
  background(bg); 
  textSize(20)
  stroke("black")  
  fill("black") 
  text(gameState, 300,50)
  //text(mouseX +' '+ mouseY, mouseX, mouseY);
  console.log(gameState)
  if(gameState === "title"){
    screen.addImage(titleImg);
    button.mouseClicked(()=>{
      gameState = "story"
    })
  }
  if(gameState === "story"){
    screen.addImage(storyImg);
    button.mouseClicked(()=>{
      gameState = "instruction"
    })
  }
  if(gameState === "instruction"){
    //screen.addImage(introImg);
    button.mouseClicked(()=>{
      gameState = "start"
    })
  }
  if(gameState === "start"){
    button.hide();
    screen.visible = false;
    spawnPeas();
    spawnSun();
    block();
    explode();
    spawnZombie();

    if(peaG.isTouching(zombieG)){
      zombieHP -=25;
    }
    if(wallG.isTouching(zombieG)){
      zombieG[0].velocityX = 0;
    }
    if(cherryG.isTouching(zombieG)){
      //explord 
      zombieG[0].destroy();
      zombieKill += 1;
      cherryG[0].addImage(explosion);
      cherryG[0].lifetime = 10
    }
    if(zombieHP===0){
      zombieG[0].destroy();
      zombieKill += 1;
    }
    if(mousePressedOver(sunG[0])){
      score = score + 25;
      sunG[0].destroy();

    }
    


    drawSprites();
    textSize(35);
    fill("black");
    text("Score : "+score,800,30 );
    text("Zombie killed : "+zombieKill,800,70 );
  }

  drawSprites();

}

function spawnPeas(){
  var pea = createSprite(100,100,30,30)
  pea.addImage(peashooter)
  pea.scale = 0.1
  if(frameCount % 40 === 0){
    var shoot = createSprite(pea.x, pea.y-25,30,30);
    shoot.addImage(shootImg);
    shoot.velocityX = 6;
    shoot.scale = 0.2;
    shoot.lifetime =200
    shootG.add(shoot)
 }
 pea.lifetime =200 
 peaG.add(pea)
}
function spawnSun(){
  var flower = createSprite(100,300,30,30);
  flower.addImage(sunflower);
  flower.scale = 0.3;
  if(frameCount% 220 === 0){
    var sun = createSprite(Math.round(random(500,1000)),0,10,10);
    sun.velocityY = 4;
    sun.addImage(sunImg);
    sun.lifetime =400
    sunG.add(sun)
  }
  flower.lifetime =200
  flowerG.add(flower);
}
function block(){
  var nut = createSprite(100,500,30,30);
  nut.addImage(wallNut);
  nut.scale = 0.7;
  nut.lifetime =200
  nut.debug = true;
  nut.setCollider("rectangle",0,0,50,50)
  wallG.add(nut);
}
function explode(){
  var cherry = createSprite(300,500,20,20);
  cherry.addImage(cherryBomb);
  cherry.scale = 0.5;
  cherry.lifetime =200
  cherryG.add(cherry);
}

function spawnZombie(){
  if(frameCount% 150===0){
  var zombies = createSprite(displayWidth, 400,10,10);
  zombies.addAnimation("running",zombieImg);
  //change the animation and have more than one zombie image
  zombies.scale = 0.5;
  zombies.y = Math.round(random(100,500))
  zombies.velocityX = -6;
  zombies.lifetime = displayWidth/8;
  zombieG.add(zombies);

  }
}
